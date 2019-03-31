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

/** Created by zouwei on 2017/7/4. */
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
    return (Timestamp) createdTime.clone();
  }

  public void setCreatedTime(Timestamp createdTime) {
    this.createdTime = (Timestamp) createdTime.clone();
  }

  @Basic
  @Column(name = "used_time")
  public Timestamp getUsedTime() {
    return (Timestamp) usedTime.clone();
  }

  public void setUsedTime(Timestamp usedTime) {
    this.usedTime = (Timestamp) usedTime.clone();
  }

  @Basic
  @Column(name = "code")
  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }
}
