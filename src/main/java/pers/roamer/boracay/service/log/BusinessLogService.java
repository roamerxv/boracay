
/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.service.log;

import lombok.extern.log4j.Log4j2;
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
import pers.roamer.boracay.datatables.DataTablesRequest;
import pers.roamer.boracay.entity.BusinessLogEntity;
import pers.roamer.boracay.repository.IBusinessLogRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * 记录业务方法日志的service
 *
 * @author 徐泽宇
 * @version 1.0.0
 * @since 1.0.0  2017/6/29 下午4:48
 */
@Log4j2
@Service("pers.roamer.boracay.service.log.BusinessLogService")
public class BusinessLogService {


    @Qualifier("pers.roamer.boracay.repository.log.IBusinessLogRepository")
    @Autowired
    private IBusinessLogRepository iBusinessLogRepository;

    /**
     * 增加一条业务日志记录
     *
     * @param data 记录的 entitybean
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午4:48
     */
    @Transactional(rollbackFor = {Exception.class})
    public void add(BusinessLogEntity data) {
        if (log.isDebugEnabled()) {
            log.debug("add(BusinessLog data={}) - start", data); //$NON-NLS-1$
        }

        iBusinessLogRepository.save(data);

        if (log.isDebugEnabled()) {
            log.debug("add(BusinessLog data={}) - end", data); //$NON-NLS-1$
        }
    }


    /**
     * 分页查询所有的业务日志, 并且支持method-desc,created-at,operator,method的复合like查询
     *
     * @param dataTablesRequest 基于 jquery datatables 组件的查询条件
     *
     * @return 返回分页封装后的数据
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午4:48
     */

    @Transactional(rollbackFor = {Exception.class})
    public Page<BusinessLogEntity> findAllByExtraSearch(DataTablesRequest dataTablesRequest) {

        String sortField = dataTablesRequest.getColumns().get(dataTablesRequest.getOrder().get(0).getColumn()).getData();

        Sort sort = "desc".equals(dataTablesRequest.getOrder().get(0).getDir()) ? new Sort(Direction.DESC, sortField) : new Sort(Direction.ASC, sortField);

        Pageable pageable = new PageRequest(dataTablesRequest.getStart() / dataTablesRequest.getLength(), dataTablesRequest.getLength(), sort);
        Specification<BusinessLogEntity> specification = new BusinessLogSpecification(dataTablesRequest.getSearch().getValue());
        return iBusinessLogRepository.findAll(specification, pageable);

    }


    /**
     * 定义一个内部类，用于实现 Specification
     *
     * @author 徐泽宇
     * @version 1.0.0  2016年10月12日 下午7:32:07
     */
    private static class BusinessLogSpecification implements Specification<BusinessLogEntity> {
        /**
         * The Extra search.
         */
        String extraSearch;

        /**
         * Instantiates a new Business log specification.
         *
         * @param extraSearch the extra search
         */
        BusinessLogSpecification(String extraSearch) {
            this.extraSearch = extraSearch;
        }

        @Override
        public Predicate toPredicate(Root<BusinessLogEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            // 加入业务操作名称字段的like查询
            Predicate methodDescriptionLike = cb.like(root.get("methodDescription"), "%" + extraSearch + "%");
            // 加入类方法名称字段的like查询
            Predicate methodLike = cb.or((Predicate) cb.like(root.get("method"), "%" + extraSearch + "%"));
            // 加入操作员字段的like查询
            Predicate operatorLike = cb.or((Predicate) cb.like(root.get("operator"), "%" + extraSearch + "%"));
            // 用or来复合这些查询
            query.where(cb.or(methodLike, methodDescriptionLike, operatorLike));
            return null;
        }
    }
}
