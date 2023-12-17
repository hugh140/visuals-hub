class AudioTools {
    constructor (){
        this.audio = document.getElementById('audio')

        let reproducir = document.getElementById('audio2')
        reproducir.setAttribute('src', this.audio.getAttribute('src'))
        document.body.appendChild(reproducir)
        this.audioContext = new AudioContext();
        this.track = this.audioContext.createMediaElementSource(this.audio)
        this.analyzer = this.audioContext.createAnalyser();
        this.analyzer.fftSize = 512;
        const bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.track.connect(this.analyzer);
    }
    getSamples(){
        this.analyzer.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e/128 - 1);
        return normSamples;
    }
    getVolume(){
        this.analyzer.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e/128 - 1);
        let sum = 0;
        for (let i = 0; i < normSamples.length; i++) 
            sum += normSamples[i] * normSamples[i];  
        let volume = Math.sqrt(sum/normSamples.length);
        return volume;
    }
    getVolumeRange(inicio, final){
        this.analyzer.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e/128 - 1);
        let sum = 0;
        for (let i = inicio; i < final; i++) 
            sum += normSamples[i] * normSamples[i];  
        let volume = Math.sqrt(sum/normSamples.length);
        return volume;
    }
}