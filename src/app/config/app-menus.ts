const Home = {
  icon: 'fas fa-home',
  title: 'Home',
  url: '/home',
};


const Work = {
  title: 'Loans Queue',
  url: '/work',
  icon: 'fas fa-briefcase',
  caret: 'true',
  submenu: [
    {
      title: 'Loan arrears',
      url: '/work/viewall',
    },
    {
      title: 'My Allocations',
      url: '/work/worklist',
    },
    {
      title: 'My Worklist',
      url: '/work/worklist',
    },
    {
      title: 'Promises to Pay',
      url: '/work/ptps',
    },
    
  ],
};




const Configurations = {
  title: 'Configurations',
  url: '/settings',
  icon: 'fas fa-briefcase',
  caret: 'true',
  submenu: [
    {
      title: 'Commissions',
      url: '/settings/commissions',
    },
    {
      title: 'Excel Uploads',
      url: '/settings/exceluploads',
    },
    {
      title: 'Settings',
      url: '/settings/home',
    }
  ],
};



const collector = [
  Home,
  Work
];


const teamleader = [
  Home,
  Work,
  Configurations
];

let appMenus: any[];

if (1) {
  appMenus = teamleader;
} else if (2) {
  appMenus = collector;
} else {
  appMenus = teamleader;
}


export default appMenus;
