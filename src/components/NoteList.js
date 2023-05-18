import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteItem from './NoteItem';
import Loader from './Loader';

const NoteList = () => {

    const [NoteList, setNoteList] = useState([{}]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllNotes();
    }, [])

    const getAllNotes = async () => {
        setLoading(true);
        await axios.get('api/v1/note/get-all-notes')
            .then(response => {
                setNoteList(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Loader visible={loading} loaderTitle={'Loading....'} />
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