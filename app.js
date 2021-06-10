const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const firstText = document.querySelector('.first-title');
const nonResult = document.querySelector('.result-none');
const songList = document.querySelector('.song-list');
const main = document.querySelector('main');
const musicInfo = document.querySelector('.music-detail');
const albumCover = document.querySelector('.album-img');
const songTitle = document.querySelector('.title');
const artistTitle = document.querySelector('.artist-name');
const lyric = document.querySelector('.lyric');
const songs = songList.querySelectorAll('li');
const backBtn = document.querySelector('.left-arrow');

// Get Search
function getResult(keyword){
    songList.innerHTML = '';
    main.classList.remove('hide');
    musicInfo.classList.remove('show');
    backBtn.classList.remove('show');
    fetch(`https://api.lyrics.ovh/suggest/${keyword}`
    ).then(res => {
        return res.json();
    }).then(json => {
        const songData = json.data;
        if(songData.length === 0){
            nonResult.classList.add('show');
        } else{
            getSongObj(songData);
            nonResult.classList.remove('show');
        }
    });
}

// Get Songs
function getSongObj(songs){
    songs.map(song => {
        const title = song.title;
        const artist = song.artist.name;
        getSongList(title, artist);
    });
}

function getLi(title){
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = title;
    span.classList.add('song-title');
    li.appendChild(span);
    li.addEventListener('click', getLyric);
    return li;
}

function getSpan(artist){
    const span = document.createElement('span');
    span.classList.add('artist');
    span.innerText = artist;
    return span;
}

function getSongList(title, artist){
    const li = getLi(title);
    const span = getSpan(artist);
    li.appendChild(span);
    songList.appendChild(li);
}

// Get Song's Info
function getLyric(e){
    const li = e.target;
    const titleSpan = li.querySelector('.song-title');
    const artistSpan = li.querySelector('.artist');
    const title = titleSpan.innerText;
    const artist = artistSpan.innerText;
    songTitle.innerText = title;
    artistTitle.innerText = artist;
    musicInfo.classList.add('show');
    main.classList.add('hide');
    backBtn.classList.add('show');
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`
    ).then(res => res.json()
    ).then(json => {
        lyric.innerText = json.lyrics;
    });
}

// Event Listener
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const keyword = searchInput.value;
    getResult(keyword);

    firstText.classList.add('hide');
});

backBtn.addEventListener('click', () => {
    main.classList.remove('hide');
    musicInfo.classList.remove('show');
    backBtn.classList.remove('show');

});