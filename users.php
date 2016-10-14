<?php 
    date_default_timezone_set('PRC');
    include 'db.php';

    $db = new SQLite();
    $users = $db->fecthall("SELECT * from BM_Users");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>报名用户数据</title>
    <style>
        * {margin: 0;padding: 0;}
        .wrap {
            margin: 20px auto;
            width: 80%;
        }
        .title {
            margin: 20px;
            text-align: center;
            font-size: 20px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .table thead th {
            height: 35px;
            line-height: 35px;
            background: #99CC66;
            font-size: 16px;
            color: #fff;
        }
        .table tbody tr:nth-of-type(even) {
            background: #eee;
        }
        .table tbody tr:hover {
            background: #666699;
            color: #fff;
        }
        .table tbody td {
            height: 35px;
            line-height: 35px;
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>
<body>
    
    <div class="wrap">
        <h1 class="title">报名用户</h1>
        <table class="table">
            <thead>
                <tr>
                    <th width="10%">#</th>
                    <th width="15%">姓名</th>
                    <th width="20%">电话</th>
                    <th width="30%">门店</th>
                    <th>报名时间</th>
                </tr>
            </thead>
            <tbody>
                <?php if( is_array($users) ) { foreach ($users as $vo) { ?>
                <tr>
                    <td><?php echo $vo['id']; ?></td>
                    <td><?php echo $vo['name']; ?></td>
                    <td><?php echo $vo['mobile']; ?></td>
                    <td><?php echo $vo['store']; ?></td>
                    <td><?php echo date('Y/m/d H:i:s', $vo['subtime']); ?></td>
                </tr>
                <?php }} ?>
            </tbody>
        </table>
    </div>

</body>
</html>