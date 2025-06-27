import React, { useState } from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { mockResources } from '../data/resources';

const ResourcesPage = () => {
  const [resources, setResources] = useState(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
  });

  const categories = ['All', ...new Set(mockResources.map(res => res.category))].sort(); // Sorted categories

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleAddResource = () => {
    if (Object.values(newResource).some(val => !val.trim())) {
      alert('Please fill in all resource fields.');
      return;
    }
    const id = `res${resources.length + 1}`;
    setResources([...resources, { id, lastUpdated: new Date().toISOString().slice(0, 10), ...newResource }]);
    setNewResource({
      title: '',
      category: '',
      description: '',
      link: '',
    });
    setShowAddForm(false);
    alert('Resource added! (Simulated)');
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || res.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h2>Health Resources</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--input-border)', flexGrow: 1, backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Hide Form' : 'Simulate Add New Resource'}
        </Button>

        {showAddForm && (
          <Card style={{ marginTop: '20px' }}>
            <h3>Add New Resource</h3>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" name="title" value={newResource.title} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input type="text" name="category" placeholder="e.g., Mental Wellness" value={newResource.category} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" value={newResource.description} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}></textarea>
            </div>
            <div className="form-group">
              <label>Link (Optional):</label>
              <input type="url" name="link" placeholder="e.g., https://example.com" value={newResource.link} onChange={handleInputChange} style={{ width: '100%', padding: '8px', border: '1px solid var(--input-border)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }} />
            </div>
            <Button onClick={handleAddResource} style={{ marginTop: '15px' }}>Add Resource</Button>
          </Card>
        )}
      </div>

      <div>
        {filteredResources.length === 0 ? (
          <p>No resources found matching your criteria.</p>
        ) : (
          filteredResources.map((res) => (
            <Card key={res.id}>
              <h3>{res.title}</h3>
              <p>Category: **{res.category}**</p>
              <p>{res.description}</p>
              {res.link && (
                <p>
                  <a href={res.link} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </p>
              )}
              <span style={{ fontSize: '0.8em', color: 'var(--text-color)' }}>Last Updated: {res.lastUpdated}</span>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;











// import React, { useState } from 'react';
// import Card from '../components/Card/Card';
// import { mockResources } from '../data/resources';

// const ResourcesPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('All');

//   const categories = ['All', ...new Set(mockResources.map(res => res.category))];

//   const filteredResources = mockResources.filter(res => {
//     const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           res.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = filterCategory === 'All' || res.category === filterCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="container">
//       <h2>Health Resources</h2>

//       <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//         <input
//           type="text"
//           placeholder="Search resources..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', flexGrow: 1 }}
//         />
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
//         >
//           {categories.map(category => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         {filteredResources.length === 0 ? (
//           <p>No resources found matching your criteria.</p>
//         ) : (
//           filteredResources.map((res) => (
//             <Card key={res.id}>
//               <h3>{res.title}</h3>
//               <p>Category: **{res.category}**</p>
//               <p>{res.description}</p>
//               {res.link && (
//                 <a href={res.link} target="_blank" rel="noopener noreferrer">
//                   Read More
//                 </a>
//               )}
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResourcesPage;