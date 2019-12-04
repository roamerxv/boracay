/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.service.log;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.controller.DataTableRequestParamBean;
import pers.roamer.boracay.entity.BusinessLogEntity;
import pers.roamer.boracay.repository.IBusinessLogRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * 记录业务方法日志的service
 *
 * @author 徐泽宇
 * @version 1.0.0
 * @since 1.0.0 2017/6/29 下午4:48
 */
@Slf4j
@Service("pers.roamer.boracay.service.log.BusinessLogService")
public class BusinessLogService {

  @Qualifier("pers.roamer.boracay.repository.IBusinessLogRepository")
  @Autowired
  private IBusinessLogRepository iBusinessLogRepository;

  /**
   * 增加一条业务日志记录
   *
   * @param data 记录的 entitybean
   * @author 徐泽宇
   * @since 1.0.0 2017/6/29 下午4:48
   */
  @Transactional(rollbackFor = {Exception.class})
  public void add(BusinessLogEntity data) {
    if (log.isDebugEnabled()) {
      log.debug("add(BusinessLog data={}) - start", data); // $NON-NLS-1$
    }

    iBusinessLogRepository.save(data);

    if (log.isDebugEnabled()) {
      log.debug("add(BusinessLog data={}) - end", data); // $NON-NLS-1$
    }
  }

  /**
   * 分页查询所有的业务日志, 并且支持以下字段内容 method（调用方法） method-desc（调用方法描述） created-at（日志记录产生时间） operator（操作人）
   * IP（IP 地址） 的复合like查询
   *
   * @param dataTableRequestParamBean 基于 jquery datatables 组件的查询条件
   * @return 返回分页封装后的数据
   * @author 徐泽宇
   * @since 1.0.0 2017/6/29 下午4:48
   */
  @Transactional(rollbackFor = {Exception.class})
  public Page<BusinessLogEntity> findAllByExtraSearch(
      DataTableRequestParamBean dataTableRequestParamBean) throws BoracayException {

    String sortField =
        dataTableRequestParamBean
            .getColumns()
            .get(dataTableRequestParamBean.getOrder().get(0).getColumn())
            .getData();
    Sort sort =
        "desc".equals(dataTableRequestParamBean.getOrder().get(0).getDir())
            ? Sort.by(Direction.DESC,sortField)
            : Sort.by(Direction.ASC, sortField);
    Pageable pageable =
        PageRequest.of(
            dataTableRequestParamBean.getStart() / dataTableRequestParamBean.getLength(),
            dataTableRequestParamBean.getLength(),
            sort);

    Specification<BusinessLogEntity> specification = null;
    try {
      specification =
          new BusinessLogSpecification(
              dataTableRequestParamBean.getSearch().getValue(),
              dataTableRequestParamBean.getBeginTime(),
              dataTableRequestParamBean.getEndTime());
    } catch (Exception e) {
      throw new BoracayException(e.getMessage());
    }
    return iBusinessLogRepository.findAll(specification, pageable);
  }

  /**
   * 定义一个内部类，用于实现 Specification
   *
   * @author 徐泽宇
   * @version 1.0.0 2016年10月12日 下午7:32:07
   */
  private static class BusinessLogSpecification implements Specification<BusinessLogEntity> {
    /** The Extra search. */
    String extraSearch;

    String beginTime;
    String endTime;

    /**
     * Instantiates a new Business log specification.
     *
     * @param extraSearch the extra search
     */
    BusinessLogSpecification(String extraSearch, String beginTime, String endTime) {
      this.extraSearch = extraSearch;
      this.beginTime = beginTime;
      this.endTime = endTime;
    }

    @Override
    public Predicate toPredicate(
        Root<BusinessLogEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
      // 加入业务操作名称字段的like查询
      Predicate methodDescriptionLike =
          cb.like(root.get("methodDescription"), "%" + extraSearch + "%");
      // 加入类方法名称字段的like查询
      Predicate methodLike = cb.like(root.get("method"), "%" + extraSearch + "%");
      // 加入操作员字段的like查询
      Predicate operatorLike = cb.like(root.get("operator"), "%" + extraSearch + "%");
      // 加入IP字段的like查询
      Predicate remoteIpLike = cb.like(root.get("remoteIp"), "%" + extraSearch + "%");
      if (beginTime.isEmpty() && endTime.isEmpty()) {
        // 用or来复合这些查询
        log.debug("起始和结束日期都是空，不做条件判断");
        query.where(cb.or(methodLike, methodDescriptionLike, operatorLike, remoteIpLike));
      } else {
        // 再判断日期输入是否合法
        // 加入日志发生时间字段的条件查询
        Date dBeginDateTime, dEndDateTime;
        String dateFormatPattern = "yyyy-MM-dd HH:mm";
        try {
          dBeginDateTime = new SimpleDateFormat(dateFormatPattern).parse(beginTime);
        } catch (ParseException e) {
          String message =
              ConfigHelper.getConfig()
                  .getString(
                      "exception.system_log.datetime_condition.begin_datetime.invalidate_format");
          log.warn(message);
          throw new HibernateException(message);
        }
        try {
          dEndDateTime = new SimpleDateFormat(dateFormatPattern).parse(endTime);
        } catch (ParseException e) {
          String message =
              ConfigHelper.getConfig()
                  .getString(
                      "exception.system_log.datetime_condition.end_datetime.invalidate_format");
          log.warn(message);
          throw new HibernateException(message);
        }
        Predicate creatAtBetween = cb.between(root.get("createdAt"), dBeginDateTime, dEndDateTime);
        query.where(
            cb.and(
                creatAtBetween,
                cb.or(methodLike, methodDescriptionLike, operatorLike, remoteIpLike)));
      }
      return null;
    }
  }
}
