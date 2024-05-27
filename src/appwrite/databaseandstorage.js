import config from "../config/config"
import { Client, Databases, ID , Storage, Query } from "appwrite";

export class DatabaseAndStorage{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("Error in create post function in databaseService "+error)
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }, // data (optional)
            );
            
        } catch (error) {
            console.log("Error in update post function in databaseService "+ error)
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug // documentId
            );
            return true
        } catch (error) {
            console.log("Error in delete post function in databaseService "+error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
            );
        } catch (error) {
            console.log("Error in get post function in databaseService "+ error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
            
        } catch (error) {
            console.log("Error in get posts function in databaseService "+ error)
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
            return true
        } catch (error) {
            console.log("Error in upload file function in databaseService "+error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Error in delete file function in databaseService "+ error)
            return false
        }
    }

    getFilePreview(fileId){        
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);       
    }

}

const databaseService = new DatabaseAndStorage()

export default databaseService