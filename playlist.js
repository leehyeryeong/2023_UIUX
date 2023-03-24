//페이지 로딩 후 실행될 수 있도록 onload에 함수 지정
window.onload = init;

function init() {
  //곡 추가 버튼
  let button = document.getElementById("addButton");
  button.onclick = handleAddButtonClick;

  //곡 삭제 버튼
  let button2 = document.getElementById("deleteButton");
  button2.onclick = function(e) {
    removeAll();
  };

  //저장되어있는 곡 불러오는 함수
  loadPlaylist();
}

//곡 삭제
function removeAll() {
  localStorage.clear();
}

//localStorage에 곡 추가
function handleAddButtonClick(e) {
  let songName = document.getElementById("songTextInput").value;
  
  if(songName == "") {
    alert("곡을 입력하세요.");
  } else {
    //localStorage에 넣기
    let playlistArray = getStoreArray("playlist");
    playlistArray.push(songName);
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
    
    addSongList([songName]);
  }
  alert("songName: " + songName);
}

function loadPlaylist() {
  let playlistArray = getStoreArray("playlist");

  addSongList(playlistArray);
}

function addSongList(songList) {
  let ul = document.getElementById("playlist");
  for(let i = 0; i < songList.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = songList[i];
    ul.appendChild(li);
  }
}

//return 값은 항상 배열로 나오게 해주기
function getStoreArray(key) {
  let playlistArray = localStorage.getItem(key);
  if(playlistArray == null || playlistArray == "") {
    //playlistArray의 값이 null이거나 ""이면 배열 타입이므로
    //빈 배열로 만들어줌
    playlistArray = new Array();
  } else {
    //데이터 값이 string이므로 객체화 시켜줌
    //배열 형태로 저장하기 위함
    playlistArray = JSON.parse(playlistArray);
  }
  return playlistArray;
}