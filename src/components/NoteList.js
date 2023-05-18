import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteItem from './NoteItem';

const NoteList = (props) => {

    const { loading } = props

    const [NoteList, setNoteList] = useState([{}]);

    useEffect(() => {
        getAllNotes();
    }, [])
 

    const getAllNotes = async () => {
        loading(true);
        await axios.get('api/v1/note/get-all-notes')
            .then(response => {
                setNoteList(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                loading(false);
            });
    }

    return (
        <>
            {NoteList &&
                NoteList?.map((note, index) => {
                    return <NoteItem
                        key={index}
                        noteId={note.noteId}
                        title={note.title}
                        description={note.description}
                        dateTime={note.dateTime}
                        noteImages={note.noteImages}
                    />
                })
            }
        </>
    )
}

export default NoteList