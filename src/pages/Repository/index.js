import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  IssuePagination,
  IssueContainer,
  Button,
} from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repoName: '',
    repository: {},
    issues: [],
    filterIssues: 'open',
    loading: true,
    page: 1,
    perPage: 5,
    nomoreissues: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filterIssues, perPage, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({ repoName });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filterIssues,
          per_page: perPage,
          page,
        },
      }),
    ]);

    if (issues.data.length < perPage) this.setState({ nomoreissues: true });

    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
  }

  componentDidUpdate(_, prevSate) {
    const { filterIssues, page } = this.state;
    if (prevSate.filterIssues !== filterIssues || prevSate.page !== page) {
      this.handleLoadIssues();
    }
  }

  handleLoadIssues = async () => {
    const { repoName, page, perPage, filterIssues, nomoreissues } = this.state;
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filterIssues,
        per_page: perPage,
        page,
      },
    });

    if (issues.data.length < perPage) {
      this.setState({ nomoreissues: true });
    } else if (nomoreissues) {
      this.setState({ nomoreissues: false });
    }

    this.setState({
      loading: false,
      issues: issues.data,
    });
  };

  handleFilterChange = filterIssues => {
    this.setState({ filterIssues });
  };

  handlePagination = p => {
    const { nomoreissues, page } = this.state;
    if (p > 0 || (p > page && !nomoreissues)) this.setState({ page: p });
  };

  render() {
    const {
      loading,
      repository,
      issues,
      filterIssues,
      page,
      nomoreissues,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar ao repósitorio</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueContainer>
          <IssueFilter>
            <Button
              filter={filterIssues}
              k="all"
              onClick={() => this.handleFilterChange('all')}
            >
              All Issues
            </Button>
            <Button
              filter={filterIssues}
              k="open"
              onClick={() => this.handleFilterChange('open')}
            >
              Opened Issues
            </Button>
            <Button
              filter={filterIssues}
              k="closed"
              onClick={() => this.handleFilterChange('closed')}
            >
              Closed Issues
            </Button>
          </IssueFilter>

          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {issue.title}
                    </a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>

          <IssuePagination>
            <Button
              disabled={page === 1}
              onClick={() => this.handlePagination(page - 1)}
            >
              {'<<'}
            </Button>

            <div>Page: {page}</div>

            <Button
              disabled={nomoreissues}
              onClick={() => this.handlePagination(page + 1)}
            >
              {'>>'}
            </Button>
          </IssuePagination>
        </IssueContainer>
      </Container>
    );
  }
}
