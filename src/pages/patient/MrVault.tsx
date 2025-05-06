
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ArrowLeft, Upload, Download, Share, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

const MrVault = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Annual Physical Results",
      type: "PDF",
      date: "2025-04-15",
      size: "1.2 MB"
    },
    {
      id: "doc-2",
      name: "Blood Test Results",
      type: "PDF",
      date: "2025-04-10",
      size: "0.8 MB"
    },
    {
      id: "doc-3",
      name: "MRI Scan",
      type: "DICOM",
      date: "2025-03-28",
      size: "15.4 MB"
    },
    {
      id: "doc-4",
      name: "Prescription - Medication A",
      type: "PDF",
      date: "2025-03-15",
      size: "0.3 MB"
    }
  ]);
  
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingFile(true);
      const file = e.target.files[0];

      // Simulate upload process
      setTimeout(() => {
        const newDocument = {
          id: `doc-${documents.length + 1}`,
          name: file.name,
          type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
          date: new Date().toISOString().split('T')[0],
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        };

        setDocuments([newDocument, ...documents]);
        setUploadingFile(false);
        
        toast({
          title: "Document Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
        
        // Reset the input field
        e.target.value = '';
      }, 1500);
    }
  };

  const handleDeleteDocument = (id: string) => {
    const documentToDelete = documents.find(doc => doc.id === id);
    setDocuments(documents.filter(doc => doc.id !== id));
    
    toast({
      title: "Document Deleted",
      description: `${documentToDelete?.name} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleShareDocument = (id: string) => {
    const documentToShare = documents.find(doc => doc.id === id);
    
    // Simulate sharing process
    toast({
      title: "Share Link Created",
      description: `A secure link for ${documentToShare?.name} has been created and copied to clipboard.`,
    });
  };

  const handleDownloadDocument = (id: string) => {
    const documentToDownload = documents.find(doc => doc.id === id);
    
    // Simulate download process
    toast({
      title: "Download Started",
      description: `${documentToDownload?.name} is downloading.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/patient" className="flex items-center text-purple-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-600">MedConnect</span>
            </div>
            <div className="w-24"></div> {/* Space balancer */}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Mr. Vault</h1>
          </div>
          
          <p className="text-gray-700 mb-8">
            Securely store, manage, and share your medical documents with healthcare providers. Your medical history in one secure place.
          </p>
          
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold">Your Documents</h2>
            <div className="relative">
              <Input
                type="file"
                id="file-upload"
                className="sr-only"
                onChange={handleFileUpload}
                disabled={uploadingFile}
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 cursor-pointer disabled:opacity-50"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploadingFile ? "Uploading..." : "Upload Document"}
              </label>
            </div>
          </div>
          
          {documents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleDownloadDocument(doc.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:text-green-800 ml-1"
                          onClick={() => handleShareDocument(doc.id)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-800 ml-1"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
              <FileText className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
              <p className="mt-1 text-sm text-gray-500">Upload your first medical document to get started.</p>
              <div className="mt-6">
                <label
                  htmlFor="file-upload-empty"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 cursor-pointer"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </label>
                <input
                  id="file-upload-empty"
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Privacy & Security</h3>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="text-sm text-gray-700">
                <strong>Your documents are secure.</strong> All files are encrypted both in transit and at rest. You maintain full control over who can access your medical records.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MrVault;
