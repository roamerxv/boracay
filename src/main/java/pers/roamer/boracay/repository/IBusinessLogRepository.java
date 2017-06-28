package pers.roamer.boracay.repository;

import pers.roamer.boracay.entity.BusinessLogEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * @author 徐泽宇
 * @ClassName: IBusinessLogRepository
 * @Description: BusinessLog的JpaRepository接口
 * @date 2016年10月21日 下午5:50:25
 */
@Repository("pers.roamer.boracay.repository.IBusinessLogRepository")
public interface IBusinessLogRepository extends JpaRepository<BusinessLogEntity, String>, PagingAndSortingRepository<BusinessLogEntity, String> {

    /**
     * findAll
     *
     * @param spec
     * @param pageable
     *
     * @return
     *
     * @Auther 徐泽宇
     * @Date 2016年10月21日 下午5:51:03
     * @Title: findAll
     * @Description: 分页按条件查询 查出所有记录
     */
    Page<BusinessLogEntity> findAll(Specification<BusinessLogEntity> spec, Pageable pageable);

    ArrayList<BusinessLogEntity> findAll() ;
}
