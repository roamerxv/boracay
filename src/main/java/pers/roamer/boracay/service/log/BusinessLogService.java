package pers.roamer.boracay.service.log;

import pers.roamer.boracay.datatables.DataTablesRequest;
import pers.roamer.boracay.entity.BusinessLogEntity;
import pers.roamer.boracay.repository.IBusinessLogRepository;
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

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * @author 徐泽宇
 * @ClassName: BusinessLogService
 * @Description: 记录业务日志的service
 * @date 2016年10月13日 下午3:54:58
 */
@Log4j2
@Service("pers.roamer.boracay.service.log.BusinessLogService")
public class BusinessLogService {


    @Qualifier("pers.roamer.boracay.repository.IBusinessLogRepository")
    @Autowired
    private IBusinessLogRepository iBusinessLogRepository;

    /**
     * add
     *
     * @param data
     *
     * @Auther 徐泽宇
     * @Date 2016年9月19日 下午5:37:28
     * @Title: add
     * @Description: 增加一条业务日志记录
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
     * @param dataTablesRequest
     *
     * @return
     *
     * @Auther 徐泽宇
     * @Date 2016年9月20日 上午11:57:51
     * @Title: findAllByExtraSearch
     * @Description: 分页查询所有的业务日志, 并且支持method-desc,created-at,operator,method的复合like查询
     */
    @Transactional(rollbackFor = {Exception.class}, readOnly = false)
    public Page<BusinessLogEntity> findAllByExtraSearch(DataTablesRequest dataTablesRequest) {

        String sortField = dataTablesRequest.getColumns().get(dataTablesRequest.getOrder().get(0).getColumn()).getData();

        Sort sort = "desc".equals(dataTablesRequest.getOrder().get(0).getDir()) ? new Sort(Direction.DESC, sortField) : new Sort(Direction.ASC, sortField);

        Pageable pageable = new PageRequest(dataTablesRequest.getStart() / dataTablesRequest.getLength(), dataTablesRequest.getLength(), sort);
        Specification<BusinessLogEntity> specification = new BusinessLogSpecification(dataTablesRequest.getSearch().getValue());
        Page<BusinessLogEntity> returnPage = iBusinessLogRepository.findAll(specification, pageable);


        return returnPage;
    }


    /**
     * @author 徐泽宇
     * @ClassName: BusinessLogSpecification
     * @Description: 定义一个内部类，用于实现 Specification
     * @date 2016年10月12日 下午7:32:07
     */
    private static class BusinessLogSpecification implements Specification<BusinessLogEntity> {
        String extraSearch;

        BusinessLogSpecification(String extraSearch) {
            this.extraSearch = extraSearch;
        }

        @Override
        public Predicate toPredicate(Root<BusinessLogEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            // 加入业务操作名称字段的like查询
            Predicate methodDescriptionLike = cb.like(root.<String>get("methodDescription"), "%" + extraSearch + "%");
            // 加入类方法名称字段的like查询
            Predicate methodLike = cb.or((Predicate) cb.like(root.<String>get("method"), "%" + extraSearch + "%"));
            // 加入操作员字段的like查询
            Predicate operatorLike = cb.or((Predicate) cb.like(root.<String>get("operator"), "%" + extraSearch + "%"));
            // 用or来复合这些查询
            query.where(cb.or(methodLike, methodDescriptionLike, operatorLike));
            return null;
        }
    }
}
