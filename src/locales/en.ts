import { ru } from '@/src/locales/ru'

export const en: LocaleType = {
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signUpTitle: 'Registration',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    forgotPasswordTitle: 'Forgot Password',
    passwordConfirmation: 'Password confirmation',
    createNewPassword: 'Create New Password',
    passwordChanged: 'Your password was successfully changed',
    newPassword: 'New password',
    passwordCharacters: 'Your password must be between 6 and 20 characters',
    dontHaveAccount: 'Don’t have an account?',
    haveAccount: 'Do you have an account?',
    instructions: 'Enter your email address and we will send you further instructions',
    email: 'Email',
    userName: 'Username',
    emailSent: 'Email sent',
    ok: 'OK',
    emailConfirm(email: string) {
      return `We have sent a link to confirm your email to ${email}`
    },
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    backToSignIn: 'Back to Sign In',
    linkHasBeenSent:
      'The link has been sent by email. If you dont receive an email send link again',
    signUpTerms: {
      description: 'I agree to the <1>Terms of service</1> and <2>Privacy Policy</2>',
    },
    agree: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    policy: 'Privacy Policy',

    // error fields block start =======================================================
    authErrors: {
      usernameField: {
        nonEmpty: 'Enter username',
        regex: 'Username can contain only A-Z, a-z, - or _',
        min: 'Min number of characters 6',
        max: 'Max number of characters 30',
      },
      emailField: {
        nonEmpty: 'Enter email',
        email: 'Invalid email address',
      },
      terms: 'Please, review and agree to the Terms of Service and Privacy Policy to proceed',
      password: {
        nonEmpty: 'Enter password',
        regex: 'Password must contain A-z, 0-9, !#$%*+-?^_',
        min: 'Min number of characters 6',
        max: 'Max number of characters 20',
      },
      recaptcha: {
        notARobot: 'I’m not a robot',
        verifyPlease: 'Please verify that you are not a robot',
        expired: 'Verification expired. Check the checkbox\n' + 'again.',
      },
      passwordConfirm: 'Confirm your password',
      refine: 'The passwords must match',
    },

    // error fields block end =======================================================
  },
  profile: {
    home: 'Home',
    createPost: 'Create',
    myProfile: 'My Profile',
    logout: 'Log Out',
    confirmLogout(email: string) {
      return `Are you really want to log out of your account ${email}?`
    },
    yes: 'Yes',
    no: 'No',
    subscriptions: 'Subscriptions',
    subscribers: 'Subscribers',
    publications: 'Publications',
    aboutYourself: 'tell about yourself',
    profileSettings: 'Profile Settings',
    favorites: 'Favorites',
    messenger: 'Messenger',
    search: 'Search',
    addPostPhoto: 'Add Photo',
    selectFromComputer: 'Select from Computer',
    passwordChanged: 'Your password was successfully changed',
    profileSetting: {
      generalInformation: 'General information',
      devices: 'Devices',
      accountManagement: 'Account Management',
      myPayment: 'My payments',
      addAProfilePhoto: 'Add a Profile Photo',
      save: 'Save',
      userName: 'Username',
      firstName: 'First name',
      lastName: 'Last name',
      dateOfBirthday: 'Date of birthday',
      city: 'City',
      selectYourCity: 'Select your city',
      aboutMe: 'About me',
      saveChanges: 'Save Changes',

      profileSettingsErrors: {
        usernameField: {
          nonEmpty: 'Enter username',
          regex: 'Username can contain only A-Z, a-z, - or _',
          min: 'Min number of characters 6',
          max: 'Max number of characters 30',
        },
        firstNameField: {
          nonEmpty: 'Enter first name',
          regex: 'First name can contain only A-Z, a-z',
          min: 'Min number of characters 1',
          max: 'Max number of characters 50',
        },
        lastNameField: {
          nonEmpty: 'Enter last name',
          regex: 'Last name can contain only A-Z, a-z',
          min: 'Min number of characters 1',
          max: 'Max number of characters 50',
        },

        aboutMeError: 'Max number of characters 200',
      },
    },
  },
}
// deletePost: 'Delete post',
// editPost: 'Edit post',
// publicationDescriptions: 'Add publication descriptions',
// saveChanges: 'Save Changes',
// yes: 'yes',
// no: 'no',
// sureDelete: 'Are you sure you want to delete this post?',
// generalInformation: 'General information',
// devices: 'Devices',
// accountManagement: 'Account Management',
// myPayments: 'My payments',
// firstName: 'First Name',
// lastName: 'Last Name',
// dateOfBirthday: 'Date of Birthday',
// city: 'City',
// aboutMe: 'About me',
// addAProfilePhoto: 'Add a profile photo',
// selectFromComputer: 'Select from computer',
// save: 'Save',
// addPhoto: 'Add photo',
// next: 'Next',
// cropping: 'Cropping',
// filters: 'Filters',
// publication: 'Publication',
// publish: 'Publish',
// close: 'Close',
// confirmClose: 'If you close everything will be deleted',

export type LocaleType = typeof ru
