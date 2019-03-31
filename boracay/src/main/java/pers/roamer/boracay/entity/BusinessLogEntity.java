package pers.roamer.boracay.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * @author roamer - 徐泽宇
 * @create 2017-09-2017/9/7 下午3:04
 */
@Entity
@Table(name = "business_log", schema = "boracay-web-sample", catalog = "")
public class BusinessLogEntity {
  private String id;
  private String operator;
  private String clazz;
  private String method;
  private String methodDescription;
  private boolean success;
  private String exceptionString;
  private String args;
  private long timeConsuming;
  private String remoteIp;
  private String clientOs;
  private String clientBrowser;
  private String browserVersion;
  private String clientDeviceType;
  private Timestamp createdAt;

  @Id
  @Column(name = "id", nullable = false, length = 40)
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @Basic
  @Column(name = "operator", nullable = true, length = 255)
  public String getOperator() {
    return operator;
  }

  public void setOperator(String operator) {
    this.operator = operator;
  }

  @Basic
  @Column(name = "clazz", nullable = false, length = 255)
  public String getClazz() {
    return clazz;
  }

  public void setClazz(String clazz) {
    this.clazz = clazz;
  }

  @Basic
  @Column(name = "method", nullable = false, length = 255)
  public String getMethod() {
    return method;
  }

  public void setMethod(String method) {
    this.method = method;
  }

  @Basic
  @Column(name = "method_description", nullable = false, length = 255)
  public String getMethodDescription() {
    return methodDescription;
  }

  public void setMethodDescription(String methodDescription) {
    this.methodDescription = methodDescription;
  }

  @Basic
  @Column(name = "success", nullable = false)
  public boolean isSuccess() {
    return success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  @Basic
  @Column(name = "exception_string", nullable = true, length = -1)
  public String getExceptionString() {
    return exceptionString;
  }

  public void setExceptionString(String exceptionString) {
    this.exceptionString = exceptionString;
  }

  @Basic
  @Column(name = "args", nullable = false, length = -1)
  public String getArgs() {
    return args;
  }

  public void setArgs(String args) {
    this.args = args;
  }

  @Basic
  @Column(name = "time_consuming", nullable = false)
  public long getTimeConsuming() {
    return timeConsuming;
  }

  public void setTimeConsuming(long timeConsuming) {
    this.timeConsuming = timeConsuming;
  }

  @Basic
  @Column(name = "remote_ip", nullable = true, length = 32)
  public String getRemoteIp() {
    return remoteIp;
  }

  public void setRemoteIp(String remoteIp) {
    this.remoteIp = remoteIp;
  }

  @Basic
  @Column(name = "client_os", nullable = true, length = 255)
  public String getClientOs() {
    return clientOs;
  }

  public void setClientOs(String clientOs) {
    this.clientOs = clientOs;
  }

  @Basic
  @Column(name = "client_browser", nullable = true, length = 255)
  public String getClientBrowser() {
    return clientBrowser;
  }

  public void setClientBrowser(String clientBrowser) {
    this.clientBrowser = clientBrowser;
  }

  @Basic
  @Column(name = "browser_version", nullable = true, length = 255)
  public String getBrowserVersion() {
    return browserVersion;
  }

  public void setBrowserVersion(String browserVersion) {
    this.browserVersion = browserVersion;
  }

  @Basic
  @Column(name = "client_device_type", nullable = true, length = 255)
  public String getClientDeviceType() {
    return clientDeviceType;
  }

  public void setClientDeviceType(String clientDeviceType) {
    this.clientDeviceType = clientDeviceType;
  }

  @Basic
  @Column(name = "created_at", nullable = false)
  public Timestamp getCreatedAt() {
    return createdAt == null ? null : (Timestamp) createdAt.clone();
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt == null ? null : (Timestamp) createdAt.clone();
  }
}
