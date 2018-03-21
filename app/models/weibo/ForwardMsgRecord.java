package models.weibo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Transient;

import org.hibernate.annotations.Index;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import play.db.jpa.Model;
import transaction.DBBuilder.DataSrc;
import transaction.JDBCBuilder;
import codegen.CodeGenerator.DBDispatcher;
import codegen.CodeGenerator.PolicySQLGenerator;

import com.ciaosir.client.CommonUtils;

@Entity(name = ForwardMsgRecord.TABLE_NAME)
public class ForwardMsgRecord extends Model implements PolicySQLGenerator {

    private static final Logger log = LoggerFactory.getLogger(ForwardMsgRecord.class);
    
    @Transient
    public static final String TABLE_NAME = "forward_msg_record";

    @Transient
    public static ForwardMsgRecord EMPTY = new ForwardMsgRecord();

    @Transient
    private static DBDispatcher dp = new DBDispatcher(DataSrc.BASIC, EMPTY);
    
    
    @Index(name = "myAccountId")
    private String myAccountId;//用户微博小号
    
    @Index(name = "friendId")
    private String friendId;//被转发的微博的帐号
    
    @Index(name = "weiboId")
    private String weiboId;//被转发的微博
    
    @Column(columnDefinition = "int default 0 ")
    private int accountType;

    private long createTs;
    
    private long updateTs;

    public String getMyAccountId() {
        return myAccountId;
    }

    public void setMyAccountId(String myAccountId) {
        this.myAccountId = myAccountId;
    }

    public String getFriendId() {
        return friendId;
    }

    public void setFriendId(String friendId) {
        this.friendId = friendId;
    }

    public String getWeiboId() {
        return weiboId;
    }

    public void setWeiboId(String weiboId) {
        this.weiboId = weiboId;
    }

    public int getAccountType() {
        return accountType;
    }

    public void setAccountType(int accountType) {
        this.accountType = accountType;
    }

    public long getCreateTs() {
        return createTs;
    }

    public void setCreateTs(long createTs) {
        this.createTs = createTs;
    }

    public long getUpdateTs() {
        return updateTs;
    }

    public void setUpdateTs(long updateTs) {
        this.updateTs = updateTs;
    }

    public ForwardMsgRecord() {
        super();
    }

    public ForwardMsgRecord(String myAccountId, String friendId,
            String weiboId, int accountType) {
        super();
        this.myAccountId = myAccountId;
        this.friendId = friendId;
        this.weiboId = weiboId;
        this.accountType = accountType;
    }

    @Override
    public String getTableName() {
        return TABLE_NAME;
    }

    @Override
    public String getTableHashKey() {
        return null;
    }

    @Override
    public String getIdColumn() {
        return "id";
    }

    @Override
    public String getIdName() {
        return "id";
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public static long findExistId(String myAccountId, String weiboId, int accountType) {
        
        String query = "select id from " + TABLE_NAME + " where myAccountId = ? and weiboId = ? " +
                " and accountType = ? ";
        
        return dp.singleLongQuery(query, myAccountId, weiboId, accountType);
    }

    @Override
    public boolean jdbcSave() {
        try {
            long existdId = findExistId(this.myAccountId, this.weiboId, this.accountType);

            if (existdId <= 0L) {
                return this.rawInsert();
            } else {
                setId(existdId);
                return this.rawUpdate();
            }

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    public boolean rawInsert() {

        String insertSQL = "insert into `" + TABLE_NAME + "`" +
                "(`myAccountId`,`friendId`,`weiboId`,`accountType`," +
                "`createTs`,`updateTs`) " +
                " values(?,?,?,?,?,?)";
        
        createTs = System.currentTimeMillis();
        updateTs = System.currentTimeMillis();
        
        long id = dp.insert(true, insertSQL, 
                this.myAccountId, this.friendId, this.weiboId, this.accountType, 
                this.createTs, this.updateTs);

        if (id > 0L) {
            setId(id);
            return true;
        } else {
            log.error("Insert Fails.....");
            return false;
        }

    }
    
    public boolean rawUpdate() {
        
        String updateSQL = "update `" + TABLE_NAME + "` set  " +
                " `friendId`, `updateTs` = ? " +
                " where myAccountId = ? and weiboId = ? and accountType = ? ";
        
        updateTs = System.currentTimeMillis();
        
        long updateNum = dp.update(false, updateSQL, 
                this.friendId, this.updateTs,
                this.myAccountId, this.weiboId, this.accountType);

        if (updateNum >= 1) {
            //log.info("update ok for :" + this.getId());
            return true;
        } else {
            log.error("update failed...for :" + this.getId());
            return false;
        }
    }
    
    
    public static Set<String> findForwardWeiboIds(int accountType, String myAccountId, Set<String> weiboIdSet) {
        if (CommonUtils.isEmpty(weiboIdSet)) {
            return new HashSet<String>();
        }
        String weiboIds = SocialAccountPlay.joinForInSqlWithEscape(weiboIdSet);
        
        String query = " select weiboId from " + TABLE_NAME + " where accountType = ? " +
                " and myAccountId = ? and weiboId in (" + weiboIds + ") ";
        
        return new JDBCBuilder.JDBCExecutor<Set<String>>(dp, query, accountType,
                myAccountId) {

            @Override
            public Set<String> doWithResultSet(ResultSet rs)
                    throws SQLException {
                
                Set<String> friendIdSet = new HashSet<String>();
                
                while (rs.next()) {
                    friendIdSet.add(rs.getString(1));
                } 
                
                return friendIdSet;
            }
            
        }.call();
    }
    
    
    private static final String SelectAllProperty = " id,myAccountId,friendId,weiboId,accountType," +
                "createTs,updateTs ";
    
    private static ForwardMsgRecord parseForwardMsgRecord(ResultSet rs) {
        try {
            
            ForwardMsgRecord record = new ForwardMsgRecord();
            
            record.setId(rs.getLong(1));
            record.setMyAccountId(rs.getString(2));
            record.setFriendId(rs.getString(3));
            record.setWeiboId(rs.getString(4));
            record.setAccountType(rs.getInt(5));
            record.setCreateTs(rs.getLong(6));
            record.setUpdateTs(rs.getLong(7));
            
            return record;
            
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return null;
        }
    }
    
}
