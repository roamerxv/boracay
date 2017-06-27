package pers.roamer.boracay.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * @author roamer - 徐泽宇
 * @create 2017-06-2017/6/1  下午4:36
 */
@Entity
@Table(name = "business_log", schema = "musichain", catalog = "")
public class BusinessLogEntity {
    private String id;
    private String operator;
    private String clazz;
    private String method;
    private boolean success;
    private String exceptionString;
    private String args;
    private String remoteIp;
    private String clientOs;
    private String clientBrowser;
    private String browserVersion;
    private String clientDeviceType;
    private Timestamp createdAt;
    private String methodDescription;

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
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Basic
    @Column(name = "method_description", nullable = false, length = 255)
    public String getMethodDescription() {
        return methodDescription;
    }

    public void setMethodDescription(String methodDescription) {
        this.methodDescription = methodDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BusinessLogEntity that = (BusinessLogEntity) o;

        if (success != that.success) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (operator != null ? !operator.equals(that.operator) : that.operator != null) return false;
        if (clazz != null ? !clazz.equals(that.clazz) : that.clazz != null) return false;
        if (method != null ? !method.equals(that.method) : that.method != null) return false;
        if (exceptionString != null ? !exceptionString.equals(that.exceptionString) : that.exceptionString != null)
            return false;
        if (args != null ? !args.equals(that.args) : that.args != null) return false;
        if (remoteIp != null ? !remoteIp.equals(that.remoteIp) : that.remoteIp != null) return false;
        if (clientOs != null ? !clientOs.equals(that.clientOs) : that.clientOs != null) return false;
        if (clientBrowser != null ? !clientBrowser.equals(that.clientBrowser) : that.clientBrowser != null)
            return false;
        if (browserVersion != null ? !browserVersion.equals(that.browserVersion) : that.browserVersion != null)
            return false;
        if (clientDeviceType != null ? !clientDeviceType.equals(that.clientDeviceType) : that.clientDeviceType != null)
            return false;
        if (createdAt != null ? !createdAt.equals(that.createdAt) : that.createdAt != null) return false;
        if (methodDescription != null ? !methodDescription.equals(that.methodDescription) : that.methodDescription != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (operator != null ? operator.hashCode() : 0);
        result = 31 * result + (clazz != null ? clazz.hashCode() : 0);
        result = 31 * result + (method != null ? method.hashCode() : 0);
        result = 31 * result + (success ? 1 : 0);
        result = 31 * result + (exceptionString != null ? exceptionString.hashCode() : 0);
        result = 31 * result + (args != null ? args.hashCode() : 0);
        result = 31 * result + (remoteIp != null ? remoteIp.hashCode() : 0);
        result = 31 * result + (clientOs != null ? clientOs.hashCode() : 0);
        result = 31 * result + (clientBrowser != null ? clientBrowser.hashCode() : 0);
        result = 31 * result + (browserVersion != null ? browserVersion.hashCode() : 0);
        result = 31 * result + (clientDeviceType != null ? clientDeviceType.hashCode() : 0);
        result = 31 * result + (createdAt != null ? createdAt.hashCode() : 0);
        result = 31 * result + (methodDescription != null ? methodDescription.hashCode() : 0);
        return result;
    }
}
