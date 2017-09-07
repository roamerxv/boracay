/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pers.roamer.boracay.entity.BusinessLogEntity;

import java.util.ArrayList;

/**
 * @author 徐泽宇
 * @version 1.0.0
 * @since 2016年10月21日 下午5:50:25
 */
@Repository("pers.roamer.boracay.repository.IBusinessLogRepository")
public interface IBusinessLogRepository extends JpaRepository<BusinessLogEntity, String>, PagingAndSortingRepository<BusinessLogEntity, String> {

    /**
     * 分页按条件查询 查出所有记录
     *
     * @param spec     查询条件
     * @param pageable 分页条件
     *
     * @return 查询结果
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:09
     */
    Page<BusinessLogEntity> findAll(Specification<BusinessLogEntity> spec, Pageable pageable);

    ArrayList<BusinessLogEntity> findAll();
}
