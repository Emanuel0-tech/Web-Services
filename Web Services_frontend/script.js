document.addEventListener('DOMContentLoaded', function () {

  const audio_transcriber_buttom = document.getElementById("audio_transcriber_buttom");
  const textToAudio_buttom = document.getElementById("textToAudio_buttom");

  async function makeRequest(url, formData, button) {
    try {
    
      button.disabled = true;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

  
      if (!response.ok) {
        throw new Error('Erro ao processar a requisição. Tente novamente mais tarde.');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      throw new Error('Erro na requisição: ' + error.message);
    } finally {
    
      button.disabled = false;
    }
  }

  audio_transcriber_buttom.addEventListener("click", async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('audioFile');
    const audioFile = fileInput.files[0];

    if (!audioFile) {
      alert('Por favor, selecione um arquivo de áudio.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const data = await makeRequest('http://127.0.0.1:8000/api/transcribe/', formData, audio_transcriber_buttom);

      const transcriptionElement = document.getElementById('transcription');
      transcriptionElement.textContent = data.transcription || 'Erro: ' + (data.error || 'Não foi possível transcrever');

    } catch (error) {
      console.error(error);
      document.getElementById('transcription').textContent = error.message;
    }
  });

  textToAudio_buttom.addEventListener('click', async (event) => {
    event.preventDefault();

    const text = document.getElementById('text').value;
    const language = document.getElementById('language').value;

    const formData = new FormData();
    formData.append('text', text);
    formData.append('language', language);

    try {
      const data = await makeRequest('http://127.0.0.1:8001/api/text-to-audio/', formData, textToAudio_buttom);

      const messageElement = document.getElementById('message');
      const audioSource = document.getElementById('audioSource');
      const audioElement = document.querySelector('audio');
      

      if (data.file_url) {
        console.log(data.file_url); // Verifique se a URL do áudio está correta
        messageElement.textContent = 'Áudio gerado com sucesso!';
        audioSource.src = data.file_url;
        audioElement.load();
        audioElement.style.display = 'block';
      } else {
        messageElement.textContent = 'Erro ao gerar áudio.';
        audioElement.style.display = 'none';
      }

    } catch (error) {
      console.error(error);
      const messageElement = document.getElementById('message');
      messageElement.textContent = error.message;
      document.querySelector('audio').style.display = 'none';
    }
  });

});
