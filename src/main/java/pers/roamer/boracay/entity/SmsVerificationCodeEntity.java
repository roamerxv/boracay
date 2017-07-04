/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by zouwei on 2017/7/4.
 */
@Entity
@Table(name = "sms_verification_code", catalog = "")
public class SmsVerificationCodeEntity {
    private String id;
    private String sessionId;
    private String opId;
    private String phoneNumber;
    private String text;
    private long duration;
    private boolean isUsed;
    private Timestamp createdTime;
    private Timestamp usedTime;
    private String code;

    @Id
    @Column(name = "id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "session_id")
    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    @Basic
    @Column(name = "op_id")
    public String getOpId() {
        return opId;
    }

    public void setOpId(String opId) {
        this.opId = opId;
    }

    @Basic
    @Column(name = "phone_number")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Basic
    @Column(name = "text")
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Basic
    @Column(name = "duration")
    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    @Basic
    @Column(name = "is_used")
    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean used) {
        isUsed = used;
    }

    @Basic
    @Column(name = "created_time")
    public Timestamp getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    @Basic
    @Column(name = "used_time")
    public Timestamp getUsedTime() {
        return usedTime;
    }

    public void setUsedTime(Timestamp usedTime) {
        this.usedTime = usedTime;
    }

    @Basic
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SmsVerificationCodeEntity entity = (SmsVerificationCodeEntity) o;

        if (duration != entity.duration) return false;
        if (isUsed != entity.isUsed) return false;
        if (id != null ? !id.equals(entity.id) : entity.id != null) return false;
        if (sessionId != null ? !sessionId.equals(entity.sessionId) : entity.sessionId != null) return false;
        if (opId != null ? !opId.equals(entity.opId) : entity.opId != null) return false;
        if (phoneNumber != null ? !phoneNumber.equals(entity.phoneNumber) : entity.phoneNumber != null) return false;
        if (text != null ? !text.equals(entity.text) : entity.text != null) return false;
        if (createdTime != null ? !createdTime.equals(entity.createdTime) : entity.createdTime != null) return false;
        if (usedTime != null ? !usedTime.equals(entity.usedTime) : entity.usedTime != null) return false;
        if (code != null ? !code.equals(entity.code) : entity.code != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (sessionId != null ? sessionId.hashCode() : 0);
        result = 31 * result + (opId != null ? opId.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        result = 31 * result + (text != null ? text.hashCode() : 0);
        result = 31 * result + (int) (duration ^ (duration >>> 32));
        result = 31 * result + (isUsed ? 1 : 0);
        result = 31 * result + (createdTime != null ? createdTime.hashCode() : 0);
        result = 31 * result + (usedTime != null ? usedTime.hashCode() : 0);
        result = 31 * result + (code != null ? code.hashCode() : 0);
        return result;
    }
}
