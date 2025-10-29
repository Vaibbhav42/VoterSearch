// Dataset 101 - Original Mumbai East constituency
const VOTERS_101 = [
  { 
    id: 'S-001', 
    name: 'Sima Ganesh Adasule', 
    voterId: 'VTR-75123', 
    gender: 'Female', 
    age: 34, 
    boothNo: 'B12', 
    srNo: '001', 
    mobile: '+91-9876543210', 
    address: '12, MG Road, Pune',
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  { 
    id: 'P-002', 
    name: 'Pandit Mainajee Jadhav', 
    voterId: 'VTR-89456', 
    gender: 'Male', 
    age: 58, 
    boothNo: 'B05', 
    srNo: '002', 
    mobile: '+91-9123456780', 
    address: 'Ramanand nagar, kolhapur',
    image: 'https://randomuser.me/api/portraits/men/52.jpg'
  },
  { 
    id: 'G-003', 
    name: 'Gautam Pandit Jadhav', 
    voterId: 'VTR-10112', 
    gender: 'Male', 
    age: 42, 
    boothNo: 'B08', 
    srNo: '003', 
    mobile: '+91-9012345678', 
    address: '9, Bhakti Nagar, Pune',
    image: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  { 
    id: 'P-004', 
    name: 'Poonam Milind Sawant', 
    voterId: 'VTR-34567', 
    gender: 'Female', 
    age: 29, 
    boothNo: 'B03', 
    srNo: '004', 
    mobile: '+91-9988776655', 
    address: '22, Shivaji Path, Pune',
    image: 'https://randomuser.me/api/portraits/women/43.jpg'
  },
  { 
    id: 'M-005', 
    name: 'Milind Shantaram Sawant', 
    voterId: 'VTR-23456', 
    gender: 'Male', 
    age: 46, 
    boothNo: 'B11', 
    srNo: '005', 
    mobile: '+91-9765432109', 
    address: '33, St. Marys, Pune',
    image: 'https://randomuser.me/api/portraits/men/30.jpg'
  },
  { 
    id: 'I-006', 
    name: 'Ishaq Mashak Patel', 
    voterId: 'VTR-56789', 
    gender: 'Male', 
    age: 52, 
    boothNo: 'B02', 
    srNo: '006', 
    mobile: '+91-9654321870', 
    address: '7, Market Lane, Pune',
    image: 'https://randomuser.me/api/portraits/men/54.jpg'
  },
  { 
    id: 'U-007', 
    name: 'Ujwala Ram Lokhande', 
    voterId: 'VTR-67890', 
    gender: 'Female', 
    age: 38, 
    boothNo: 'B06', 
    srNo: '007', 
    mobile: '+91-9123098765', 
    address: '18, Parvati, Pune',
    image: 'https://randomuser.me/api/portraits/women/40.jpg'
  },
  { 
    id: 'S-008', 
    name: 'Sunil Kumar Dinesh Kumar Jain', 
    voterId: 'VTR-90123', 
    gender: 'Male', 
    age: 61, 
    boothNo: 'B09', 
    srNo: '008', 
    mobile: '+91-9012987654', 
    address: '101, Ganesh Chowk, Pune',
    image: 'https://randomuser.me/api/portraits/men/62.jpg'
  },
  { 
    id: 'A-009', 
    name: 'Abdul Qadir Nadibalal Shaikh', 
    voterId: 'VTR-45678', 
    gender: 'Male', 
    age: 47, 
    boothNo: 'B04', 
    srNo: '009', 
    mobile: '+91-9098765432', 
    address: '56, Riverside, Pune',
    image: 'https://randomuser.me/api/portraits/men/48.jpg'
  },
];

// Dataset 102 - Mumbai West constituency
const VOTERS_102 = [
  { 
    id: 'MW-001', 
    name: 'Ravi Kumar Sharma', 
    voterId: 'VTR-80001', 
    gender: 'Male', 
    age: 45, 
    boothNo: 'B21', 
    srNo: '001', 
    mobile: '+91-9876540001', 
    address: '15, Andheri West, Mumbai',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    id: 'MW-002', 
    name: 'Priya Desai', 
    voterId: 'VTR-80002', 
    gender: 'Female', 
    age: 38, 
    boothNo: 'B22', 
    srNo: '002', 
    mobile: '+91-9876540002', 
    address: '28, Bandra West, Mumbai',
    image: 'https://randomuser.me/api/portraits/women/25.jpg'
  },
  { 
    id: 'MW-003', 
    name: 'Amit Patel', 
    voterId: 'VTR-80003', 
    gender: 'Male', 
    age: 52, 
    boothNo: 'B23', 
    srNo: '003', 
    mobile: '+91-9876540003', 
    address: '42, Juhu, Mumbai',
    image: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
    // --- Added from Hindi PDF: 2025-EROLLGEN-S04-46-SIR-FinalRoll-Revision1-HIN-1-WI ---
    { id: 'MW-004', name: 'राम कुमार यादव', voterId: 'VTR-80004', gender: 'Male', age: 50, boothNo: 'B24', srNo: '004', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/70.jpg' },
    { id: 'MW-005', name: 'सीता देवी शर्मा', voterId: 'VTR-80005', gender: 'Female', age: 42, boothNo: 'B24', srNo: '005', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/71.jpg' },
    { id: 'MW-006', name: 'मोहन लाल वर्मा', voterId: 'VTR-80006', gender: 'Male', age: 36, boothNo: 'B24', srNo: '006', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/72.jpg' },
    { id: 'MW-007', name: 'गीता कुमारी', voterId: 'VTR-80007', gender: 'Female', age: 29, boothNo: 'B24', srNo: '007', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/73.jpg' },
    { id: 'MW-008', name: 'अजय सिंह', voterId: 'VTR-80008', gender: 'Male', age: 41, boothNo: 'B24', srNo: '008', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/74.jpg' },
    { id: 'MW-009', name: 'किरण देवी', voterId: 'VTR-80009', gender: 'Female', age: 35, boothNo: 'B24', srNo: '009', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/75.jpg' },
    { id: 'MW-010', name: 'सुरेश कुमार', voterId: 'VTR-80010', gender: 'Male', age: 48, boothNo: 'B24', srNo: '010', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/76.jpg' },
    { id: 'MW-011', name: 'माया शर्मा', voterId: 'VTR-80011', gender: 'Female', age: 39, boothNo: 'B24', srNo: '011', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/77.jpg' },
    { id: 'MW-012', name: 'विनोद कुमार', voterId: 'VTR-80012', gender: 'Male', age: 44, boothNo: 'B24', srNo: '012', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/78.jpg' },
    { id: 'MW-013', name: 'राधा देवी', voterId: 'VTR-80013', gender: 'Female', age: 33, boothNo: 'B24', srNo: '013', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/79.jpg' },
    { id: 'MW-014', name: 'शिव कुमार', voterId: 'VTR-80014', gender: 'Male', age: 52, boothNo: 'B24', srNo: '014', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/80.jpg' },
    { id: 'MW-015', name: 'पूनम कुमारी', voterId: 'VTR-80015', gender: 'Female', age: 27, boothNo: 'B24', srNo: '015', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/81.jpg' },
    { id: 'MW-016', name: 'अमित कुमार', voterId: 'VTR-80016', gender: 'Male', age: 38, boothNo: 'B24', srNo: '016', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/82.jpg' },
    { id: 'MW-017', name: 'सुमन देवी', voterId: 'VTR-80017', gender: 'Female', age: 31, boothNo: 'B24', srNo: '017', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/83.jpg' },
    { id: 'MW-018', name: 'राजेश कुमार', voterId: 'VTR-80018', gender: 'Male', age: 47, boothNo: 'B24', srNo: '018', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/84.jpg' },
    { id: 'MW-019', name: 'कुसुम कुमारी', voterId: 'VTR-80019', gender: 'Female', age: 40, boothNo: 'B24', srNo: '019', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/85.jpg' },
    { id: 'MW-020', name: 'मनोज कुमार', voterId: 'VTR-80020', gender: 'Male', age: 34, boothNo: 'B24', srNo: '020', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/86.jpg' },
    { id: 'MW-021', name: 'रमा देवी', voterId: 'VTR-80021', gender: 'Female', age: 37, boothNo: 'B24', srNo: '021', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/87.jpg' },
    { id: 'MW-022', name: 'अशोक कुमार', voterId: 'VTR-80022', gender: 'Male', age: 43, boothNo: 'B24', srNo: '022', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/men/88.jpg' },
    { id: 'MW-023', name: 'सावित्री देवी', voterId: 'VTR-80023', gender: 'Female', age: 32, boothNo: 'B24', srNo: '023', mobile: '', address: 'सांताक्रूज़, मुंबई', image: 'https://randomuser.me/api/portraits/women/89.jpg' },
];

// Dataset 103 - Delhi North constituency
const VOTERS_103 = [
  { 
    id: 'DN-001', 
    name: 'Sunita Singh', 
    voterId: 'VTR-90001', 
    gender: 'Female', 
    age: 41, 
    boothNo: 'B31', 
    srNo: '001', 
    mobile: '+91-9876540011', 
    address: '67, Civil Lines, Delhi',
    image: 'https://randomuser.me/api/portraits/women/35.jpg'
  },
  { 
    id: 'DN-002', 
    name: 'Rajesh Gupta', 
    voterId: 'VTR-90002', 
    gender: 'Male', 
    age: 49, 
    boothNo: 'B32', 
    srNo: '002', 
    mobile: '+91-9876540012', 
    address: '89, Karol Bagh, Delhi',
    image: 'https://randomuser.me/api/portraits/men/42.jpg'
  },
  { 
    id: 'DN-003', 
    name: 'Meera Joshi', 
    voterId: 'VTR-90003', 
    gender: 'Female', 
    age: 36, 
    boothNo: 'B33', 
    srNo: '003', 
    mobile: '+91-9876540013', 
    address: '23, Punjabi Bagh, Delhi',
    image: 'https://randomuser.me/api/portraits/women/28.jpg'
  },
];

// Dataset 104 - Bangalore South constituency
const VOTERS_104 = [
  { 
    id: 'BS-001', 
    name: 'Vikram Reddy', 
    voterId: 'VTR-70001', 
    gender: 'Male', 
    age: 44, 
    boothNo: 'B41', 
    srNo: '001', 
    mobile: '+91-9876540021', 
    address: '34, JP Nagar, Bangalore',
    image: 'https://randomuser.me/api/portraits/men/38.jpg'
  },
  { 
    id: 'BS-002', 
    name: 'Lakshmi Iyer', 
    voterId: 'VTR-70002', 
    gender: 'Female', 
    age: 39, 
    boothNo: 'B42', 
    srNo: '002', 
    mobile: '+91-9876540022', 
    address: '56, Koramangala, Bangalore',
    image: 'https://randomuser.me/api/portraits/women/31.jpg'
  },
  { 
    id: 'BS-003', 
    name: 'Suresh Kumar', 
    voterId: 'VTR-70003', 
    gender: 'Male', 
    age: 51, 
    boothNo: 'B43', 
    srNo: '003', 
    mobile: '+91-9876540023', 
    address: '78, BTM Layout, Bangalore',
    image: 'https://randomuser.me/api/portraits/men/47.jpg'
  },
];

// Dataset 105 - Chennai Central constituency
const VOTERS_105 = [
  { 
    id: 'CC-001', 
    name: 'Kamala Krishnan', 
    voterId: 'VTR-60001', 
    gender: 'Female', 
    age: 43, 
    boothNo: 'B51', 
    srNo: '001', 
    mobile: '+91-9876540031', 
    address: '12, T. Nagar, Chennai',
    image: 'https://randomuser.me/api/portraits/women/40.jpg'
  },
  { 
    id: 'CC-002', 
    name: 'Raman Nair', 
    voterId: 'VTR-60002', 
    gender: 'Male', 
    age: 47, 
    boothNo: 'B52', 
    srNo: '002', 
    mobile: '+91-9876540032', 
    address: '45, Anna Nagar, Chennai',
    image: 'https://randomuser.me/api/portraits/men/51.jpg'
  },
  { 
    id: 'CC-003', 
    name: 'Divya Subramanian', 
    voterId: 'VTR-60003', 
    gender: 'Female', 
    age: 35, 
    boothNo: 'B53', 
    srNo: '003', 
    mobile: '+91-9876540033', 
    address: '67, Adyar, Chennai',
    image: 'https://randomuser.me/api/portraits/women/33.jpg'
  },
];

// Dataset 106 - Kolkata East constituency
const VOTERS_106 = [
  { 
    id: 'KE-001', 
    name: 'Biplab Chatterjee', 
    voterId: 'VTR-50001', 
    gender: 'Male', 
    age: 48, 
    boothNo: 'B61', 
    srNo: '001', 
    mobile: '+91-9876540041', 
    address: '89, Salt Lake, Kolkata',
    image: 'https://randomuser.me/api/portraits/men/44.jpg'
  },
  { 
    id: 'KE-002', 
    name: 'Rina Ghosh', 
    voterId: 'VTR-50002', 
    gender: 'Female', 
    age: 42, 
    boothNo: 'B62', 
    srNo: '002', 
    mobile: '+91-9876540042', 
    address: '23, Park Street, Kolkata',
    image: 'https://randomuser.me/api/portraits/women/38.jpg'
  },
  { 
    id: 'KE-003', 
    name: 'Debasis Roy', 
    voterId: 'VTR-50003', 
    gender: 'Male', 
    age: 55, 
    boothNo: 'B63', 
    srNo: '003', 
    mobile: '+91-9876540043', 
    address: '34, Gariahat, Kolkata',
    image: 'https://randomuser.me/api/portraits/men/56.jpg'
  },
];

// Dataset 107 - Hyderabad constituency
const VOTERS_107 = [
  { 
    id: 'HY-001', 
    name: 'Srinivas Rao', 
    voterId: 'VTR-40001', 
    gender: 'Male', 
    age: 46, 
    boothNo: 'B71', 
    srNo: '001', 
    mobile: '+91-9876540051', 
    address: '45, Banjara Hills, Hyderabad',
    image: 'https://randomuser.me/api/portraits/men/40.jpg'
  },
  { 
    id: 'HY-002', 
    name: 'Padma Devi', 
    voterId: 'VTR-40002', 
    gender: 'Female', 
    age: 40, 
    boothNo: 'B72', 
    srNo: '002', 
    mobile: '+91-9876540052', 
    address: '67, Jubilee Hills, Hyderabad',
    image: 'https://randomuser.me/api/portraits/women/42.jpg'
  },
  { 
    id: 'HY-003', 
    name: 'Krishna Murthy', 
    voterId: 'VTR-40003', 
    gender: 'Male', 
    age: 53, 
    boothNo: 'B73', 
    srNo: '003', 
    mobile: '+91-9876540053', 
    address: '12, Secunderabad, Hyderabad',
    image: 'https://randomuser.me/api/portraits/men/53.jpg'
  },
];

// Dataset 108 - Ahmedabad constituency
const VOTERS_108 = [
  { 
    id: 'AH-001', 
    name: 'Kiran Shah', 
    voterId: 'VTR-30001', 
    gender: 'Male', 
    age: 45, 
    boothNo: 'B81', 
    srNo: '001', 
    mobile: '+91-9876540061', 
    address: '23, Navrangpura, Ahmedabad',
    image: 'https://randomuser.me/api/portraits/men/35.jpg'
  },
  { 
    id: 'AH-002', 
    name: 'Nita Patel', 
    voterId: 'VTR-30002', 
    gender: 'Female', 
    age: 37, 
    boothNo: 'B82', 
    srNo: '002', 
    mobile: '+91-9876540062', 
    address: '56, Satellite, Ahmedabad',
    image: 'https://randomuser.me/api/portraits/women/36.jpg'
  },
  { 
    id: 'AH-003', 
    name: 'Jayesh Modi', 
    voterId: 'VTR-30003', 
    gender: 'Male', 
    age: 50, 
    boothNo: 'B83', 
    srNo: '003', 
    mobile: '+91-9876540063', 
    address: '78, Vastrapur, Ahmedabad',
    image: 'https://randomuser.me/api/portraits/men/49.jpg'
  },
];

// Dataset 109 - Jaipur constituency
const VOTERS_109 = [
  { 
    id: 'JP-001', 
    name: 'Anita Sharma', 
    voterId: 'VTR-20001', 
    gender: 'Female', 
    age: 44, 
    boothNo: 'B91', 
    srNo: '001', 
    mobile: '+91-9876540071', 
    address: '34, C-Scheme, Jaipur',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    id: 'JP-002', 
    name: 'Manoj Agarwal', 
    voterId: 'VTR-20002', 
    gender: 'Male', 
    age: 48, 
    boothNo: 'B92', 
    srNo: '002', 
    mobile: '+91-9876540072', 
    address: '67, Malviya Nagar, Jaipur',
    image: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  { 
    id: 'JP-003', 
    name: 'Kavita Jain', 
    voterId: 'VTR-20003', 
    gender: 'Female', 
    age: 41, 
    boothNo: 'B93', 
    srNo: '003', 
    mobile: '+91-9876540073', 
    address: '12, Vaishali Nagar, Jaipur',
    image: 'https://randomuser.me/api/portraits/women/41.jpg'
  },
];

// Dataset 110 - Lucknow constituency
const VOTERS_110 = [
  { 
    id: 'LK-001', 
    name: 'Rohit Verma', 
    voterId: 'VTR-10001', 
    gender: 'Male', 
    age: 42, 
    boothNo: 'B101', 
    srNo: '001', 
    mobile: '+91-9876540081', 
    address: '45, Hazratganj, Lucknow',
    image: 'https://randomuser.me/api/portraits/men/41.jpg'
  },
  { 
    id: 'LK-002', 
    name: 'Sushma Tripathi', 
    voterId: 'VTR-10002', 
    gender: 'Female', 
    age: 39, 
    boothNo: 'B102', 
    srNo: '002', 
    mobile: '+91-9876540082', 
    address: '67, Gomti Nagar, Lucknow',
    image: 'https://randomuser.me/api/portraits/women/39.jpg'
  },
  { 
    id: 'LK-003', 
    name: 'Ashok Singh', 
    voterId: 'VTR-10003', 
    gender: 'Male', 
    age: 54, 
    boothNo: 'B103', 
    srNo: '003', 
    mobile: '+91-9876540083', 
    address: '23, Aliganj, Lucknow',
    image: 'https://randomuser.me/api/portraits/men/54.jpg'
  },
];

// Dataset 111 - Kanpur constituency
const VOTERS_111 = [
  { 
    id: 'K-001', 
    name: 'Kavita Singh Yadav', 
    voterId: 'VTR-84001', 
    gender: 'Female', 
    age: 31, 
    boothNo: 'B111', 
    srNo: '001', 
    mobile: '+91-9876540084', 
    address: '45, Civil Lines, Kanpur',
    image: 'https://randomuser.me/api/portraits/women/70.jpg'
  },
  { 
    id: 'R-002', 
    name: 'Rajesh Kumar Gupta', 
    voterId: 'VTR-84002', 
    gender: 'Male', 
    age: 45, 
    boothNo: 'B112', 
    srNo: '002', 
    mobile: '+91-9876540085', 
    address: '12, Swaroop Nagar, Kanpur',
    image: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  { 
    id: 'P-003', 
    name: 'Priya Sharma Verma', 
    voterId: 'VTR-84003', 
    gender: 'Female', 
    age: 28, 
    boothNo: 'B113', 
    srNo: '003', 
    mobile: '+91-9876540086', 
    address: '67, Kidwai Nagar, Kanpur',
    image: 'https://randomuser.me/api/portraits/women/71.jpg'
  },
];

// Map of all datasets
const VOTER_DATASETS = {
  101: VOTERS_101,
  102: VOTERS_102,
  103: VOTERS_103,
  104: VOTERS_104,
  105: VOTERS_105,
  106: VOTERS_106,
  107: VOTERS_107,
  108: VOTERS_108,
  109: VOTERS_109,
  110: VOTERS_110,
  111: VOTERS_111,
};

// Dataset names for display
const DATASET_NAMES = {
  101: 'Voter List 1',
  102: 'Voter List 2', 
  103: 'Voter List 3',
  104: 'Voter List 4',
  105: 'Voter List 5',
  106: 'Voter List 6',
  107: 'Voter List 7',
  108: 'Voter List 8',
  109: 'Voter List 9',
  110: 'Voter List 10',
  111: 'Voter List 11',
};

// Default to dataset 101 for backward compatibility
const VOTERS = VOTERS_101;

export { VOTER_DATASETS, DATASET_NAMES };
export default VOTERS;
