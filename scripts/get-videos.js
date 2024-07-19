const API_KEY = 'AIzaSyBJ_RDDNCS5YbbbG5oDgzutc5CHfrsqrmY';
const CHANNEL_ID = 'UCaNv8_92knivCDxLsGW1AMA';
const VIDEOS_PER_PAGE = 50; // Number of videos to load per page
let nextPageToken = ''; // Token to fetch the next page of results

// Function to fetch videos based on nextPageToken
async function fetchVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${VIDEOS_PER_PAGE}&pageToken=${nextPageToken}`);
    const data = await response.json();
    nextPageToken = data.nextPageToken; // Update nextPageToken for next fetch
    displayVideos(data.items);
}

// Function to display videos
function displayVideos(videos) {
    const videoGrid = document.getElementById('video-grid');
    videos.forEach(video => {
        if (!video.id.videoId || video.snippet.title.toLowerCase().includes('shorts')) return;

        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const videoLink = document.createElement('a');
        videoLink.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        videoLink.target = '_blank';

        const videoThumbnail = document.createElement('img');
        videoThumbnail.src = video.snippet.thumbnails.high.url;
        videoThumbnail.alt = video.snippet.title;

        const videoTitle = document.createElement('h3');
        videoTitle.textContent = video.snippet.title;

        videoLink.appendChild(videoThumbnail);
        videoItem.appendChild(videoLink);
        videoItem.appendChild(videoTitle);
        videoGrid.appendChild(videoItem);
    });
}

// Event listener for scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchVideos(); // Fetch more videos when user scrolls to bottom
    }
});

// Initial load of videos
fetchVideos();