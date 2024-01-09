// export async function computeHash(input) {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(input);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     return hashHex;
//   }

  export async function computeHash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
  
    try {
      const hashBuffer = await crypto?.subtle?.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (error) {
      console.error('Error computing hash:', error);
      return null;
    }
  }
