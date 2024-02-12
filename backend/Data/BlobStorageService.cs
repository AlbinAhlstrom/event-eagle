using Azure.Storage.Blobs;

namespace Data;

public class BlobStorageService : IBlobStorageService
{
    private BlobServiceClient _client;

    public BlobStorageService(BlobServiceClient client)
    {
        _client = client;
    }
    public async Task<byte[]> GetBlob(string key)
    {
        throw new NotImplementedException();
    }

    public async Task UploadToBlobStorage(MemoryStream stream, string fileName)
    {
        var blobContainer = _client.GetBlobContainerClient("eeticketsblob");
        await blobContainer.CreateIfNotExistsAsync();
        var blobClient = blobContainer.GetBlobClient(fileName);

        await blobClient.UploadAsync(stream, true);
    }
}


