import ProjectRepository from "~/api/project";
import Repository from "~/api/repository";

const store = {
  state: {
    api: {
      headers: {}
    }
  }
}

describe('Project Repository', () => {
  const repository = new ProjectRepository(store)

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('is a repository', () => {
    expect(repository instanceof Repository).toBe(true)
  })

  it('can get project', async () => {
    fetch.once(JSON.stringify({
      id: 1,
      name: 'New Talents',
      slug: 'new-talents',
      description: 'Une super asso !'
    }))

    const data = await repository.get('new-talents')

    expect(data.id).toBe(1)
    expect(data.name).toBe('New Talents')
    expect(data.slug).toBe('new-talents')
  })
})