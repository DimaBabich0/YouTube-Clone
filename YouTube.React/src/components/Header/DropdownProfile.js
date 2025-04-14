const dropdownSections = [

  {
    type: 'profile',
    items: [
      { 
        src: './images/header-images/acc.svg',
        alt: 'Profile',
        channelName: 'LiLia Hmel',
        userName: '@kltrons'
      }
    ]
  },
  {
    type: 'dropdown',
    items: [
      {
        src: './images/header-images/dropdown-profile/person.svg',
        text: 'Your channel',
        arrow: false,
        path: '/channel'
      },
      {
        src: './images/header-images/dropdown-profile/supervisor_account.svg',
        text: 'Switch account',
        arrow: true,
        path: '/sign-in'
      },      
      {
        src: './images/header-images/dropdown-profile/domino_mask.svg',
        text: 'Enable incognito mode',
        arrow: false
      },
      {
        src: './images/header-images/dropdown-profile/themes.svg',
        text: 'Themes',
        arrow: false
      },
    ]
  },
  {
    type: 'dropdown',
    items: [
      {
        src: './images/header-images/dropdown-profile/brightness.svg',
        text: 'Appearance: Dark',
        arrow: true
      },
      {
        src: './images/header-images/dropdown-profile/translate.svg',
        text: 'Language: British English',
        arrow: true
      },
      {
        src: './images/header-images/dropdown-profile/language.svg',
        text: 'Location: Ukraine',
        arrow: true
      },
      {
        src: './images/header-images/dropdown-profile/admin.svg',
        text: 'Restricted Mode: Off',
        arrow: true
      },
    ]
  },
  {
    type: 'dropdown',
    items: [
      {
        src: './images/header-images/dropdown-profile/settings.svg',
        text: 'Settings',
        arrow: false
      }
    ]
  },
  {
    type: 'dropdown',
    items: [
      {
        src: './images/header-images/dropdown-profile/help.svg',
        text: 'Help',
        arrow: false
      },
      {
        src: './images/header-images/dropdown-profile/feedback.svg',
        text: 'Send Feedback',
        arrow: false
      }
    ]
  }
];


export default dropdownSections;