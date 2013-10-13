action-server
====================================
起動：
-------------
1.action serviceのインスタンスを作る。
		service = new service();

2.actionと関数の対応表を設定する。

		1:	service.actionHandlers = {
				so:'changeSoundHandler',
				color:'changeColorHandler',
			};
		
		2:  service.actionHandlers['color'] = 'changeColorHandler';

________________________________________________________________________
ログイン
-------------
 ログインはフォームからpostでユーザの情報を送る。
 
		<form method="post">
			<label for="name">ユーザー名</label>
			<input type="text" name="name"/>
			<button class="btn btn-primary" type="submit">ログイン</button>
		</form>
________________________________________________________________________
関数/function
-------------

1.サーバへactionを送る関数:  service.putAction(type,data);

		type:このactionの名前。
			dataのフォーマット:　string;
		data: actionの内容。
			dataのフォーマット:　string;object;配列;　自分好きなように
2.actionHandler通用する場合: service.autoAction(type,data);

2.ログアウト関数: service.logout();


_________________________________________________________________________
イベント/Event
-------------
1.新しいユーザーがオンラインした場合、この関数をよびだされる。

	function onlineEventHandler(users,user){
		//プログラム
		console.log(user+'オンライン');
	};
	
2.ユーザーがオフラインした場合、この関数を呼び出される

	function offlineEventHandler(users,user){
		//プログラム
		console.log(user+'オフラインした');
	}
