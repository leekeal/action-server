action-server
====================================================
起動：
======
service = new service();

2.actionと関数の対応表を設定する。

		1:	service.actionHandlers = {
				so:'changeSoundHandler',
				color:'changeColorHandler',
			};

		2:  service.actionHandlers['color'] = 'changeColorHandler';

====================================================
関数/function
=============

1.サーバへactionを送る関数:  service.putAction(type,data);

						  type:このactionの名前。
						  		dataのフォーマット:　string;
						  data: actionの内容。
						  		dataのフォーマット:　string;object;配列;　自分好きなように
						  		
2.ログアウト関数: service.logout();


====================================================
ログイン
========
 ログインはフォームからpostでユーザの情報を送る。
 	<form method="post" >
		<label for="name">ユーザー名</label>
		<input type="text" name="name"/>
		<button class="btn btn-primary" type="submit">ログイン</button>
  	</form>