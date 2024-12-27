const formatTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'yr', seconds: 31536000 },
        { label: 'mo', seconds: 2592000 },
        { label: 'w', seconds: 604800 },
        { label: 'd', seconds: 86400 },
        { label: 'hr', seconds: 3600 },
        { label: 'min', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
        }
    }
    return 'just now';
}

export default formatTime;