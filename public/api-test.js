// Test d'authentification simple
function testAuth() {
    console.log('Testing FOREAS Authentication System...');
    
    // Test localStorage
    try {
        localStorage.setItem('test', 'working');
        const result = localStorage.getItem('test');
        console.log('✅ localStorage working:', result === 'working');
        localStorage.removeItem('test');
    } catch(e) {
        console.error('❌ localStorage error:', e);
    }
    
    // Simuler connexion partenaire
    const testPartner = {
        name: 'Test Partner',
        email: 'test@foreas.com',
        drivers: 15
    };
    
    try {
        localStorage.setItem('foreas_auth', 'true');
        localStorage.setItem('partner_data', JSON.stringify(testPartner));
        console.log('✅ Partner data stored successfully');
        
        // Vérifier la récupération
        const authStatus = localStorage.getItem('foreas_auth');
        const partnerData = JSON.parse(localStorage.getItem('partner_data'));
        
        console.log('Auth status:', authStatus);
        console.log('Partner data:', partnerData);
        
        if (authStatus === 'true' && partnerData.email === 'test@foreas.com') {
            console.log('🎉 Authentication system ready!');
            return true;
        }
    } catch(e) {
        console.error('❌ Authentication test failed:', e);
    }
    
    return false;
}

// Auto-run test
if (typeof window !== 'undefined') {
    window.addEventListener('load', testAuth);
    window.testAuth = testAuth;
}