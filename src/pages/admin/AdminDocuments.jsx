import { useEffect, useState } from 'react'
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Search,
  X,
  Eye,
  EyeOff,
} from 'lucide-react'
import { dbService } from '../../lib/supabase'
import Button from '../../components/Button'

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingDoc, setEditingDoc] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    pdf_url: '',
    description: '',
    is_active: true,
    display_order: 0,
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    document.title = 'PDF Resources Management — Agamozhi Admin'
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    setLoading(true)
    try {
      const data = await dbService.fetchDocuments(true) // include inactive
      setDocuments(data || [])
    } catch (err) {
      console.error('Failed to load documents:', err)
      setErrorMessage('Failed to load PDF documents.')
    } finally {
      setLoading(false)
    }
  }

  const validateUrl = (urlStr) => {
    try {
      const parsed = new URL(urlStr)
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
      return false
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) {
      errors.title = 'Document title is required.'
    }
    if (!formData.pdf_url.trim()) {
      errors.pdf_url = 'PDF Link is required.'
    } else if (!validateUrl(formData.pdf_url.trim())) {
      errors.pdf_url = 'Please enter a valid URL (e.g. https://example.com/file.pdf).'
    }
    return errors
  }

  const handleOpenAddModal = () => {
    setEditingDoc(null)
    setFormData({
      title: '',
      pdf_url: '',
      description: '',
      is_active: true,
      display_order: documents.length + 1,
    })
    setFormErrors({})
    setErrorMessage('')
    setSuccessMessage('')
    setShowModal(true)
  }

  const handleOpenEditModal = (doc) => {
    setEditingDoc(doc)
    setFormData({
      title: doc.title || '',
      pdf_url: doc.pdf_url || '',
      description: doc.description || '',
      is_active: doc.is_active !== false,
      display_order: doc.display_order || 1,
    })
    setFormErrors({})
    setErrorMessage('')
    setSuccessMessage('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingDoc(null)
    setFormErrors({})
  }

  const handleSaveDocument = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setSaving(true)
    setErrorMessage('')
    try {
      if (editingDoc) {
        await dbService.updateDocument(editingDoc.id, formData)
        setSuccessMessage('Document updated successfully.')
      } else {
        await dbService.createDocument(formData)
        setSuccessMessage('New PDF document added successfully.')
      }
      handleCloseModal()
      await loadDocuments()
    } catch (err) {
      console.error('Save document failed:', err)
      setErrorMessage(err.message || 'Failed to save document.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteDocument = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"? This cannot be undone.`
    )
    if (!confirmDelete) return

    setDeletingId(id)
    try {
      await dbService.deleteDocument(id)
      setSuccessMessage('Document deleted successfully.')
      await loadDocuments()
    } catch (err) {
      console.error('Delete document failed:', err)
      setErrorMessage('Failed to delete document.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (doc) => {
    const newStatus = !doc.is_active
    try {
      await dbService.toggleDocumentActive(doc.id, newStatus)
      setDocuments((prev) =>
        prev.map((d) => (d.id === doc.id ? { ...d, is_active: newStatus } : d))
      )
      setSuccessMessage(
        `"${doc.title}" is now ${newStatus ? 'Active & visible on public site' : 'Inactive & hidden'}.`
      )
    } catch (err) {
      console.error('Toggle active failed:', err)
      setErrorMessage('Failed to update document status.')
    }
  }

  const filteredDocs = documents.filter((doc) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      doc.title?.toLowerCase().includes(q) ||
      doc.description?.toLowerCase().includes(q) ||
      doc.pdf_url?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-blue-600" />
            <span>PDF Resources & Documents</span>
          </h1>
          <p className="text-slate-600 text-sm mt-0.5">
            Manage downloadable brochures, package sheets, and guides available on the public website.
          </p>
        </div>

        <Button size="md" onClick={handleOpenAddModal} className="shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add PDF</span>
        </Button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-red-700 hover:text-red-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="relative flex-1 w-full max-w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, or URL..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold shrink-0">
          Total: {documents.length} PDF{documents.length !== 1 ? 's' : ''} ({documents.filter((d) => d.is_active).length} Active)
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
            <p className="text-slate-600 text-sm font-medium">Loading documents...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="font-bold text-base text-slate-800">No PDF Documents Found</div>
            <p className="text-xs max-w-sm mx-auto text-slate-600">
              {search ? 'Try adjusting your search query.' : 'Click "Add PDF" above to add your first downloadable document.'}
            </p>
            {!search && (
              <Button size="sm" onClick={handleOpenAddModal} variant="outline">
                <Plus className="w-3.5 h-3.5" />
                <span>Add First PDF</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-slate-50/70 ${
                  !doc.is_active ? 'bg-slate-50/50 opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      doc.is_active
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    <FileText className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-bold text-base text-slate-900">{doc.title}</h3>
                      <button
                        onClick={() => handleToggleActive(doc)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                          doc.is_active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {doc.is_active ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Active (Visible)</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            <span>Inactive (Hidden)</span>
                          </>
                        )}
                      </button>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Order #{doc.display_order || 1}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                      {doc.description || 'No description provided.'}
                    </p>

                    <div className="pt-1">
                      <a
                        href={doc.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-mono truncate max-w-md"
                      >
                        <span>{doc.pdf_url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleOpenEditModal(doc)}
                    className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-semibold inline-flex items-center gap-1.5"
                    title="Edit Document"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDocument(doc.id, doc.title)}
                    disabled={deletingId === doc.id}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-xs font-semibold inline-flex items-center gap-1.5"
                    title="Delete Document"
                  >
                    {deletingId === doc.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingDoc ? 'Edit PDF Document' : 'Add New PDF Document'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter document title and direct link to the PDF file.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDocument} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Business Website Guide"
                  required
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none ${
                    formErrors.title ? 'border-red-500 bg-red-50/20' : 'border-slate-300 focus:border-blue-600'
                  }`}
                />
                {formErrors.title && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.title}</p>
                )}
              </div>

              {/* PDF Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  PDF Link (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.pdf_url}
                  onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                  placeholder="https://example.com/files/brochure.pdf"
                  required
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none font-mono ${
                    formErrors.pdf_url ? 'border-red-500 bg-red-50/20' : 'border-slate-300 focus:border-blue-600'
                  }`}
                />
                {formErrors.pdf_url ? (
                  <p className="text-xs text-red-600 mt-1">{formErrors.pdf_url}</p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Paste the direct URL to your hosted PDF file.
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A brief summary explaining what this document contains..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-none resize-none"
                />
              </div>

              {/* Display Order & Active status */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-800">Active (Visible to public)</span>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button type="button" variant="outline" size="sm" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={saving}>
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingDoc ? 'Save Changes' : 'Add Document'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDocuments
