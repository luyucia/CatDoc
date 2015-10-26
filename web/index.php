<?php

require '/home/wwwroot/CatPHP/catphp/catphp.php';
define('APP_PATH', dirname(__FILE__).'/../');
// 包含常量,最先加载是因为在下面的函数中可使用此文件定义常量
// require APP_PATH.'common/const.php';
// 包含通用函数
// require APP_PATH.'common/function.php';

Web::start();

?>
