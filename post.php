<?php 
    
    header('content-type:text/html,charset=UTF-8');
    include 'db.php';

    $name = $_POST['name'];
    $mobile = $_POST['mobile'];
    //门店
    $prov = $_POST['prov'];
    $code = $_POST['code'];
    $store = $_POST['store'];
    $provStore = $prov.'---'.$code.'---'.$store;
    //报名时间
    $time = time();

    $db = new SQLite();
    $sql = "INSERT INTO BM_Users (name,mobile,store,subtime) VALUES ('{$name}','{$mobile}','{$provStore}','{$time}')";
    $db->create($sql);

    $arr = array(
            'status' => 'success', 
            'msg' => '报名成功!', 
        );

    echo json_encode($arr);