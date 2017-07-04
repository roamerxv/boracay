/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pers.roamer.boracay.entity.SmsVerificationCodeEntity;

import java.util.ArrayList;

/**
 * Created by jyj on 2017/6/6.
 */
@Repository("com.ninelephas.raccoon.repository.ISmsVerificationCodeRepository")
public interface ISmsVerificationCodeRepository extends JpaRepository<SmsVerificationCodeEntity, String>, PagingAndSortingRepository<SmsVerificationCodeEntity, String> {
    ArrayList<SmsVerificationCodeEntity> findAllBySessionIdAndOpIdAndUsedOrderByCreatedTimeDesc(String sessionId, String opId, boolean used);
}
