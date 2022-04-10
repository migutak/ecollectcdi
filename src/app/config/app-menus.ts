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
      title: 'Loan arrears(ALL)',
      url: '/work/viewall',
    },
    {
      title: 'Broken PTPs',
      url: '/work/ptps',
    },
    {
      title: 'View all Loans',
      url: '/work/allloans',
    },
    {
      title: 'My Worklist',
      url: '/work/myworklist',
    },
  ],
};




const Configurations = {
  title: 'Configurations',
  url: '/config',
  icon: 'fas fa-briefcase',
  caret: 'true',
  submenu: [
    {
      title: 'Commissions',
      url: '/config/commission',
    },
    {
      title: 'Excel Uploads',
      url: '/config/exceluploads',
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
