import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteItem from './NoteItem';

const NoteList = (props) => {

    const { setLoading, refresh, setRefresh, searchQuery } = props

    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        getAllNotes();
    }, [])

    useEffect(() => {
        getAllNotes();
    }, [refresh])

    useEffect(() => {
        if (searchQuery.length > 0) {
            searchNotes();
        } else {
            getAllNotes();
        }
    }, [searchQuery])

    const searchNotes = async () => {
        await axios.get('api/v1/note/search', {
            params: {
                searchKeyword: searchQuery,
            }
        })
            .then((response) => {
                setNoteList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                setRefresh(false);
                setLoading(false);
            });
    }

    return (
        <>
            {noteList &&
                noteList?.map((note, index) => {
                    return <NoteItem
                        key={index}
                        noteId={note.noteId}
                        title={note.title}
                        description={note.description}
                        dateTime={note.dateTime}
                        noteImages={note.noteImages}
                        setRefresh={setRefresh}
                    />
                })
            }
        </>
    )
}

export default NoteList