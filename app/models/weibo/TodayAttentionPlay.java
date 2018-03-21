package models.weibo;

import java.sql.ResultSet;
import java.sql.SQLException;

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

import com.ciaosir.client.utils.DateUtil;

@Entity(name = TodayAttentionPlay.TABLE_NAME)
public class TodayAttentionPlay extends Model implements PolicySQLGenerator {

    private static final Logger log = LoggerFactory.getLogger(TodayAttentionPlay.class);
    
    @Transient
    public static final String TABLE_NAME = "today_attention_play_";

    @Transient
    public static TodayAttentionPlay EMPTY = new TodayAttentionPlay();

    @Transient
    private static DBDispatcher dp = new DBDispatcher(DataSrc.BASIC, EMPTY);
    
    
    @Index(name = "userId")
    private Long userId;
    
    @Column(columnDefinition = "int default 0 ")
    private int accountType;
    
    @Column(columnDefinition = "int default 0 ")
    private int forwardNum;
    
    @Column(columnDefinition = "int default 0 ")
    private int attentionNum;
    
    private long dayTs;
    
    private long createTs;
    
    private long updateTs;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getAccountType() {
        return accountType;
    }

    public void setAccountType(int accountType) {
        this.accountType = accountType;
    }
    
    public int getForwardNum() {
        return forwardNum;
    }

    public void setForwardNum(int forwardNum) {
        this.forwardNum = forwardNum;
    }

    public int getAttentionNum() {
        return attentionNum;
    }

    public void setAttentionNum(int attentionNum) {
        this.attentionNum = attentionNum;
    }

    public long getDayTs() {
        return dayTs;
    }

    public void setDayTs(long dayTs) {
        this.dayTs = dayTs;
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

    public TodayAttentionPlay() {
        super();
    }

    public TodayAttentionPlay(Long userId, int accountType, long dayTs) {
        super();
        this.userId = userId;
        this.accountType = accountType;
        this.dayTs = dayTs;
    }
    
    

    public void updateTodayAttention(int forwardNum,
            int attentionNum, long dayTs) {
        
        this.forwardNum = forwardNum;
        this.attentionNum = attentionNum;
        this.dayTs = dayTs;
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

    public static long findExistId(Long userId, int accountType) {
        
        String query = "select id from " + TABLE_NAME + " where userId = ? and accountType = ? ";
        
        return dp.singleLongQuery(query, userId, accountType);
    }

    @Override
    public boolean jdbcSave() {
        try {
            long existdId = findExistId(this.userId, this.accountType);

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
                "(`userId`,`accountType`,`forwardNum`,`attentionNum`,`dayTs`," +
                "`createTs`,`updateTs`) " +
                " values(?,?,?,?,?,?,?)";
        
        createTs = System.currentTimeMillis();
        updateTs = System.currentTimeMillis();
        
        long id = dp.insert(true, insertSQL, 
                this.userId, this.accountType, this.forwardNum, this.attentionNum, this.dayTs, 
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
                " `forwardNum` = ?, `attentionNum` = ?, `dayTs` = ?, " +
                " `updateTs` = ? " +
                " where userId = ? and accountType = ? ";
        
        updateTs = System.currentTimeMillis();
        
        long updateNum = dp.update(false, updateSQL, 
                this.forwardNum, this.attentionNum, this.dayTs, 
                this.updateTs,
                this.userId, this.accountType);

        if (updateNum >= 1) {
            //log.info("update ok for :" + this.getId());
            return true;
        } else {
            log.error("update failed...for :" + this.getId());
            return false;
        }
    }
    
    public static TodayAttentionPlay ensureTodayAttention(Long userId, int accountType) {
        
        TodayAttentionPlay attention = findByAccountType(userId, accountType);
        
        long currDate = DateUtil.formCurrDate();
        if (attention == null) {
            attention = new TodayAttentionPlay(userId, accountType, currDate);
            attention.jdbcSave();
            return attention;
        } else {
            if (attention.getDayTs() != currDate) {
                attention.updateTodayAttention(0, 0, currDate);
                attention.jdbcSave();
            }
            return attention;
        }
    }
    
    
    private static TodayAttentionPlay findByAccountType(Long userId, int accountType) {
        
        String query = " select " + SelectAllProperty + " from " + TABLE_NAME + " where userId = ? " +
                " and accountType = ? ";
        
        return new JDBCBuilder.JDBCExecutor<TodayAttentionPlay>(dp, query, userId, accountType) {

            @Override
            public TodayAttentionPlay doWithResultSet(ResultSet rs)
                    throws SQLException {
                
                if (rs.next()) {
                    TodayAttentionPlay attention = parseTodayAttentionPlay(rs);
                    return attention;
                } else {
                    return null;
                }
            }
            
        }.call();
        
    }
    
    
    private static final String SelectAllProperty = " id,userId,accountType,forwardNum,attentionNum,dayTs," +
                "createTs,updateTs ";
    
    private static TodayAttentionPlay parseTodayAttentionPlay(ResultSet rs) {
        try {
            
            TodayAttentionPlay todayAttention = new TodayAttentionPlay();
            
            todayAttention.setId(rs.getLong(1));
            todayAttention.setUserId(rs.getLong(2));
            todayAttention.setAccountType(rs.getInt(3));
            todayAttention.setForwardNum(rs.getInt(4));
            todayAttention.setAttentionNum(rs.getInt(5));
            todayAttention.setDayTs(rs.getLong(6));
            todayAttention.setCreateTs(rs.getLong(7));
            todayAttention.setUpdateTs(rs.getLong(8));
            
            return todayAttention;
            
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return null;
        }
    }
}
