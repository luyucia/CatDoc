<?php

/**
 * @name IndexController
 * @author Luyu
 * @desc 默认控制器
 */
class apiController extends BaseController {

    // 添加api
    public function add() {
        // 解析参数
        $params = P('params');
        $url = P('url');
        $method = P('method');
        // 构造请求
        // $post = $this->parseParam($params);
        // 验签
        // $sign = $this->sign($post);
        // $post['sig'] = $sign;
        // 发送请求
        // $client = new  HttpClient();
        // to do 根据请求发不同请求
        // $rtn = $client->post($url,$post);
        // 解析返回值
        $data['name'] = P('name');
        $data['url'] = P('url');
        $data['method'] = P('method');
        $data['params'] = P('params');
        // $data['rtn'] = $rtn;
        $rtn = $this->model->insert($data);
        echo $rtn;
    }

    private function parseParam($param) {
        $postdata = array();
        $params = explode('&', $param);
        if (!empty($params[0])) {
            foreach ($params as $p) {
                $pair = explode('=', $p);
                $postdata[$pair[0]] = $pair[1];
            }
        }
        return $postdata;
    }

    public function sign($data) {
        $skey = '18fnssnfl0efk89jrf348';
        $time = intval(microtime(true));
        $s = '';
        ksort($data);
        foreach ($data as $key => $value) {
            $s .= $key . $value;
        }
        $s .= $skey;
        $s .= $time;
        return md5($s) . ".$time";
    }

    public function lists() {
        $sql = "select * from api order by `order`";
        $rs = $this->db->query($sql);
        $this->echoJson(0, $rs);
    }

    public function toMarkdown() {
        $sql = "select * from api order by `order`";
        $rs = $this->db->query($sql);
        echo "<pre>";
        foreach ($rs as $r) {
            $params = '';
            $params_arr = $this->parseParam($r['params']);
            if (is_array($params_arr)) {
                foreach ($params_arr as $key => $value) {
                    $params .= "| $key | $value |  |\n";
                }
            }

            $t = <<<mk
### {$r['name']}
- url:{$r['url']}
- method:{$r['method']}

| 参数 | 样例值 | 说明 |
| -------- | -------- | -------- |
$params

```
{$r['rtn']}
```

mk;
            echo $t;
        }
    }

    public function test() {
        // 解析参数
        $params = P('params');
        $url = P('url');
        $method = P('method');
        // 构造请求
        $post = $this->parseParam($params);
        // 验签
        $sign = $this->sign($post);
        $post['sig'] = $sign;
        // 发送请求
        $client = new  HttpClient();
        // to do 根据请求发不同请求
        $time_start = microtime(true);
        $rtn = $client->post($url, $post);
        $time_cost = 'Time Cost: ' . ((microtime(true) - $time_start) * 1000) . ' ms';
        // echo $rtn;
        // 解析返回值
        // $rtn = str_replace('\\', '', $rtn) ;
        // var_dump(json_decode($rtn));
//        $data['rtn'] = json_encode(json_decode($rtn), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        $data['rtn'] = json_encode(json_decode($rtn), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($data['rtn'] == 'null') {
            $json['rtn'] = $rtn;
            $json['cost'] = $time_cost;
            echo json_encode($json);
        } else {
            // echo $data['rtn'];
            $json['rtn'] = $data['rtn'];
            $json['cost'] = $time_cost;
            echo json_encode($json);
        }

        // $data['params'] = $params;
        $id = P('id');
        $where = "id=$id";
        $rtn = $this->model->update($data, $where);
    }

    public function delete() {
        $id = P('id');
        $where = "id=$id";
        $this->model->delete($where);
    }
}

?>
