import { Error } from "mongoose";
import Notes from "../Models/notes.model.js";

export const getAllnotes = async(req,res)=>{

    try {

        const getNotes = await Notes.find();

        if(getNotes.length == 0)
            return res.status(201).send({
        success:true,
        message:"No notes in database"
            })

            return res.status(201).send({
                success:true,
                message: "All notes are fetched",
                getNotes
            })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Internal Server problem",
            error
        })
    }

}

export const addNewNote = async(req,res)=>{
    try {
        const{title,content} = req.body;


        if(!title || !content  || title.trim() === "" || content.trim() === "")
            return res.status(402).send({
                success:true,
                message: "Please fill all the fields"
            })

        const existingNote = await Notes.findOne({title});

        if(existingNote)
            return res.status(401).send({
        success : false,
        message : "A note with this title already exist"
            })
    
        const note = new Notes({title,content});
        await note.save();
        
        return res.status(201).send({
            success:true,
            message : "Note addeed successfully",
            note
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal Server Problem",
            error
        })
    }
}

export const getNoteById = async(req,res) =>{
    try {

        const note = await Notes.findById(req.params.id);

        if(!note)
            return res.status(404).send({
                success : false,
                message: "Note not found!"
            })

        res.status(200).json(note);
        
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Internal Server Problem",
            error      
        })
    }
}

export const updateContent = async (req,res) => {
    
    try {
        
        const{NewTitle,content} = req.body;
        const id = req.params.id;

        
        const newNote = await Notes.findByIdAndUpdate(id,{title : NewTitle, content},{new:true});

        if(!newNote)
        {
            return res.status(404).send({
                success:false,
                message:"this note is not exist"
            })
        }


        res.status(201).send({
            success:true,
            message:"Note updated successfully",
            newNote
        })
    } catch (error) {
        res.status(501).send({
            success:false,
            message:"Internal server problem",
            error
        })
    }    
}

export const deleteNote = async(req,res) => {
    try {
        
        const noteId = req.params.id;
        const deleted = await Notes.findByIdAndDelete(noteId);

        if(!deleted)
            return res.status(404).send({
                success : false,
                message :"Note not found"
            })

            res.status(201).send({
                success : true,
                message : "Note deleted Successfully"
            })
    } catch (error) {
        res.status(501).send({
                success : false,
                message :"Internal Server Not found",
                error
            })
    }
}