// # 시작 함수
// 해당파일제일 최하단에 실행함수 존재함.
const init = () => {
	// 버튼 이벤트 등록
	document.querySelector("#kakao").addEventListener('click', onKakao);
	document.querySelector("#logout").addEventListener('click', onLogout);
	
	// 자동 로그인 실행
	autoLogin();

	// 해당 함수는 Router 대신 실행하는 함수입니다.
	redirectPage();
}

// 팝업창 열기
const openWindowPopup = (url, name) => {
	var options = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no';
	return window.open(url, name, options);
}

// 카카오 OAuth
const onKakao = async () => {
	document.querySelector("#loading").classList.remove('display_none');

	let url = await fetch("/oauth/url", {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})
	.then(res => res.json())
	.then(res => res['kakao_oauth_url']);

	const newWindow = openWindowPopup(url, "카카오톡 로그인");

	const checkConnect = setInterval(function() {
		if (!newWindow || !newWindow.closed) return;
		clearInterval(checkConnect);
		
		if(getCookie('logined') === 'true') {
			window.location.reload();
		} else {
			document.querySelector("#loading").classList.add('display_none');
		}
	}, 1000);
}

// OAuth 로그인 후, 리다이렉트 페이지
const redirectPage = () => {
	// 만약 /oauth 으로 이동된다면 자동으로 해당 창은 닫습니다.
	const pathname = window.location.pathname;
	if (pathname.startsWith('/oauth')) {
		window.close();
	}
}

// 자동 로그인
const autoLogin = async () => {
	let data = await fetch("/userinfo", {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})
	.then(res => res.json());
	try {
		if (!!data['msg']) {
			if (data['msg'] === `Missing cookie "access_token_cookie"`) {
				console.log("자동로그인 실패");
				return;
			} else if (data['msg'] === `Token has expired`) {
				console.log("Access Token 만료");
				refreshToken();
				return;
			}
		} else {
			console.log("자동로그인 성공");
			const nickname = document.querySelector("#nickname");
			const thumnail = document.querySelector("#thumnail");

			nickname.textContent = `${data.nickname}`;
			thumnail.src = data.profile;

			document.querySelector('#kakao').classList.add('display_none');
			document.querySelector('#logout').classList.remove('display_none');
			nickname.classList.remove('display_none');
			thumnail.classList.remove('display_none');
		}
	} catch (error) {
		console.log(`Error: ${error}`);
		return;
	}
}

// 토큰 재발급
const refreshToken = async () => {
	let data = await fetch("/token/refresh", {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})
	.then(res => res.json());
	if (data.result) {
		console.log("Access Token 갱신");
		autoLogin();
	} else {
		if (data.msg === `Token has expired`) {
			console.log("Refresh Token 만료");

			document.querySelector('#kakao').classList.remove('display_none');
			document.querySelector('#logout').classList.add('display_none');
			document.querySelector("#nickname").classList.add('display_none');
			document.querySelector("#thumnail").classList.add('display_none');
	
			onKakao();
			return;
		}

		fetch("/token/remove", {
			headers: { "Content-Type": "application/json" },
			method: "GET"
		});
		alert("로그인을 다시 해주세요!");

		document.querySelector('#kakao').classList.remove('display_none');
		document.querySelector('#logout').classList.add('display_none');
		document.querySelector("#nickname").classList.add('display_none');
		document.querySelector("#thumnail").classList.add('display_none');
	}
}

// 로그아웃
const onLogout = async () => {
	let data = await fetch("/token/remove", {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})
	.then(res => res.json());

	if (data.result) {
		console.log("로그아웃 성공");
		alert("정상적으로 로그아웃이 되었습니다.");
		window.location.reload();
	} else {
		console.log("로그아웃 실패");
	}
}

const getCookie = (cookieName) => {
	let cookieValue=null;
	if(document.cookie){
		let array=document.cookie.split((escape(cookieName)+'='));
		if(array.length >= 2){
			let arraySub=array[1].split(';');
			cookieValue=unescape(arraySub[0]);
		}
	}
	return cookieValue;
}

init();