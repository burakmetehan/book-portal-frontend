const PAGINATION = {
  showSizeChanger: true,
  current: 1, // Current page number
  pageNumber: 0, // Page number for backend call
  pageSize: 5, // Page size for both table and backend call
  pageSizeOptions: [5, 10, 20, 50, 100],
  total: 0 // Total number of data items
}

export default PAGINATION;