import React from 'react';

export default function FileInput(props){
    const {setCode, setOpen} = props;

    const handleFileChange = (event) =>{
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
      
            reader.onload = (e) => {
              // Leggi il contenuto del file
              const content = e.target.result;
              setOpen(false);
              setCode(content);
              
            };
      
            // Leggi il file come testo
            reader.readAsText(file);
          }
    }

    return (<div>
        <input type="file" onChange={handleFileChange}></input>
    </div>)
}