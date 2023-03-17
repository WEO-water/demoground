import ghpages from 'gh-pages';


ghpages.publish(
    'build', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/WEO-water/demoground.git', // Update to point to your repository  
        user: {
            name: 'thierryweo', // update to use your name
            email: 'tnicola@weo-water.com' // Update to use your email
        },
        dotfiles: true,
    },
    () => {
        console.log('Deploy Complete!')
    }
)