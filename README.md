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
	
	この表から、対応する関数を呼び出す。
	例：
		
		function changeColorHander(data,from){
			$("#example").css("background-color",color);
		};

________________________________________________________________________
ログイン
-------------
 ログインはフォームからpostでユーザの情報を送る。
 
		<form method="post">
			<label for="username">ユーザー名</label>
			<input type="text" name="username"/>
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

3.ログアウト関数: service.logout();

_________________________________________________________________________
イベント/Event
-------------
1.新しいユーザーがオンラインした場合、この関数をよびだされる。

	function onlineEventHandler(users,user,self){
		users:全てのオンラインユーザー
		user:新しいオンラインしたユーザー名前
		self:自分かを判断する変数
				true:  自分です。
				false:自分じゃない
		//プログラム
		console.log(user+'オンライン');
	};
	
2.ユーザーがオフラインした場合、この関数を呼び出される

	function offlineEventHandler(users,user){
		//プログラム
		console.log(user+'オフラインした');
	}


	クロス ドメイン (Cross-Domain) の問題を理解する

3.動作しているユーザーを示す。平均２秒一回この関数を呼び出される。
	
	function markActiveUserHandler(data){
    	$(".user#"+data.from).animate({color:'red',opacity:'1'},1300);
    	$(".user#"+data.from).animate({color:'black',opacity:'1'},700);
	}
	
_________________________________________________________________________
デバッグ/debug:
-------------
	
	1.デバッグ機能をオープンする
		
		service.debug = true;

________________________________________________________________________
