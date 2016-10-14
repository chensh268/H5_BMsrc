<?php 
    /**
    * SQLite Class
    */
    class SQLite extends SQLite3
    {
        function __construct()
        {
            $this->open('db.sqlite3');
        }

        //插入数据
        public function create($sql)
        {
            $ret = $this->exec($sql);
            if(!$ret){
                return $this->lastErrorMsg();
            }else{
                return 'successfully';
            }
            $this->close();
        }

        //更新数据
        public function update($sql)
        {
            $ret = $this->exec($sql);
            if(!$ret){
                return $this->lastErrorMsg();
            }else{
                return $this->changes();
            }
            $this->close();
        }

        //查询数据
        function fecthall($sql){
            $return = array();
            $ret = $this->query($sql);
            while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
                array_push($return, $row);
            }
            $this->close();
            return $return;
        }
    }