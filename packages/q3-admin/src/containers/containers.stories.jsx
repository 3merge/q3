import React from 'react';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import { useLoading } from 'q3-ui-rest';
import { Equals } from 'q3-ui-filters/lib/components';
import Tour from 'q3-ui/lib/tour';
import {
  StoriesApiMockAuthentication,
  StoriesApiMockWrapper,
} from '../__fixtures__';
import App from '../components/app';
import Main from '../components/main';
import Search from './search';
import Add from './add';
import Detail from './detail';
import Header from './header';
import Page from './page';
import Table from './table';
import SubDetail from './subDetail';
import connect from './connect';
import Filter from './filter';

export default {
  title: 'Q3 Admin|Demo',
};

const resolver = ({
  id,
  photo,
  firstName,
  lastName,
  email,
  createdBy,
  investments,
  ...rest
}) => ({
  id,
  name: `${firstName} ${lastName}`,
  description: email,
  url: `/investors/${id}`,
  investments: investments ? investments.length : 0,
  createdBy: createdBy ? `${createdBy.firstName}` : 'Sys',
  photo,
  ...rest,
});

const Investors = (props) => (
  <Page index {...props}>
    <Add>
      <Form
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
      >
        <Field name="firstName" type="text" required />
        <Field name="lastName" type="text" required />
        <Field name="email" type="email" required />
      </Form>
    </Add>
    <Header>
      <Search intercept={resolver} />
    </Header>
    <Table
      resolvers={resolver}
      defaultColumns={[
        'gender',
        'updatedAt',
        'investments',
      ]}
      allColumns={[
        'gender',
        'updatedAt',
        'investments',
        'createdBy',
      ]}
      renderForm={() => (
        <Filter>
          <Equals
            type="text"
            label="Equals to this value"
            name="equals"
          />
        </Filter>
      )}
    />
  </Page>
);

const General = connect(({ data, ...rest }) => (
  <Form {...rest} initialValues={data}>
    <Field name="firstName" type="text" />
    <Field name="gender" type="text" />
  </Form>
));

const Hidden = connect(() => <div>Conditional</div>);

const Investments = () => (
  <SubDetail
    root="investments"
    cardProps={{
      title: 'company',
      attributes: ['shares'],
      editable: {
        shares: {
          type: 'number',
          min: 1,
        },
      },
    }}
    initialValues={{
      company: '',
      shares: 1,
    }}
  >
    <Form>
      <Field name="company" type="text" required />
      <Field name="shares" type="number" min={1} />
    </Form>
  </SubDetail>
);

const panels = (data) => {
  if (!Object.keys(data).length) return [];

  return [
    {
      title: 'Investments',
      content: `There are currently ${data.investments.length} in the portfolio`,
    },
  ];
};

const Investor = (props) => (
  <Page
    {...props}
    index
    viewResolutions={{
      hidden: {
        roles: ['Admin'],
        conditional: ['gender=Male'],
      },
    }}
  >
    <Header titleProp="firstName" />
    <Detail registerPanels={panels} files picture history>
      <General name="general" />
      <Investments name="investments" />
      <Hidden name="hidden" />
    </Detail>
  </Page>
);

const pages = [
  {
    icon: AttachMoney,
    component: Investors,
    collectionName: 'api-investors',
    resourceName: 'investors',
    resourceNameSingular: 'investor',
    index: true,
  },
  {
    component: Investor,
    collectionName: 'api-investors',
    resourceName: 'investors',
    resourceNameSingular: 'investor',
    id: true,
  },
];

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const withProviders = (initialPath = '/') => (
  <Loading>
    <LocationProvider initialPath={initialPath}>
      <StoriesApiMockAuthentication>
        <StoriesApiMockWrapper>
          <Main
            pages={pages}
            render={() => <App pages={pages} />}
            ProfileBarProps={{
              profileImgSrc:
                'https://randomuser.me/api/portraits/men/83.jpg',
            }}
          />
        </StoriesApiMockWrapper>
      </StoriesApiMockAuthentication>
      <LocationDebugger />
    </LocationProvider>
  </Loading>
);

export const FromList = withProviders('/investors');
export const FromDetail = withProviders('/investors/1');
export const FromSubDetail = withProviders(
  '/investors/1/investments',
);

export const FromTrash = withProviders(
  '/investors/1/trash',
);
