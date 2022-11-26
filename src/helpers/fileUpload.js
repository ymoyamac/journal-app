export async function fileUplaod(file) {
    if(!file) {
        throw new Error("No file has been uploaded")
    }
    const cloudUrl = "https://api.cloudinary.com/v1_1/di798ldfq/upload"
    const formData = new FormData()
    formData.append("upload_preset", "journal-app")
    formData.append("file", file)
    try {
        const response = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        })
        if(!response.ok) {
            throw new Error("Image loading failed")
        }
        const cloudResp = await response.json()
        return cloudResp.secure_url
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}