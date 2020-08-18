//This section work in put the API Link....

const lyricsApi = {
   
    baseUrl:"https://api.lyrics.ovh"
}

//This section work in input the song name from the user.....

document.getElementById('click-button').addEventListener('click',function(){

    let songName = document.getElementById('get-song-name-from-user').value;

    getSongName(songName);
});

//This section work in given the songs name inside  the function .....

function getSongName(name){

    fetch(`${lyricsApi.baseUrl}/suggest/${name}`)

    .then(songData=>{
     
        return songData.json();
    })
    
    .then (getSongData);
}

// This section work in detcet the song all details....

function getSongData(songData){

    const songDetailsContainer = document.getElementById('songList');

    for(let i=0; i<10;i++){

            let songDataList = songData.data[i];

            let titleName = songDataList.title;

            let albumName = songDataList.album.title;

            let artistName = songDataList.artist.name;

            songDetailsContainer.innerHTML +=`
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                <h3 class="lyrics-name">${titleName}</h3>
                <p class="author lead">Album Name: <span>${albumName}</span></p>
                <p class="author lead">Artist Name: <span>${artistName}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyrics('${artistName}','${titleName}')">Get Lyrics</button>
                </div>
             </div>`
        
    }
}

// This section work in track out the song lyrics...

function getLyrics(artistName,titleName)
{
    fetch(`${lyricsApi.baseUrl}/v1/${artistName}/${titleName}`)

    .then(lyricsData=>{
        return lyricsData.json();
    })
    
    .then(getLyricsData);
}

// This section work in display the song lyrics....

function getLyricsData(data){

    const lyrics= document.getElementById('display-lyrics');

    lyrics.innerHTML =`<pre class="lyric text-white">${data.lyrics}<pre>`
}