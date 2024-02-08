using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

public class BlobStorageService
{
    private readonly BlobServiceClient _client;

    public BlobStorageService(BlobServiceClient client)
    {
        _client = client;
    }

    public async Task DeleteFileAsync(string containerName, string filePath)
    {
        try
        {
            var blobContainer = _client.GetBlobContainerClient(containerName);
            var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
            await blobClient.DeleteAsync();
        }
        catch (FileNotFoundException error)
        {
            throw error;
        }
    }

    public async Task<string> UploadPdfAsync(string containerName, IFormFile pdfFile, string userSub)
    {
        var blobContainer = _client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync(PublicAccessType.Blob);

        var blobClient = blobContainer.GetBlobClient(pdfFile.FileName);
        var contentType = "application/pdf";

        await using (var stream = pdfFile.OpenReadStream())
        {
            await blobClient.UploadAsync(stream, new BlobUploadOptions { HttpHeaders = new BlobHttpHeaders { ContentType = contentType } });
        }

        // Add metadata
        var metadata = new Dictionary<string, string> { { "userId", userSub } };
        await blobClient.SetMetadataAsync(metadata);

        return blobClient.Uri.ToString();
    }
}
