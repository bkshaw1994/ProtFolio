import experienceReducer, {
  setExperience
} from '../features/experience/experienceSlice';
import profileReducer, { setProfile } from '../features/profile/profileSlice';
import projectsReducer, {
  setProjects,
  setFeaturedProjects
} from '../features/projects/projectsSlice';
import skillsReducer, {
  setSkills,
  setCoreSkills
} from '../features/skills/skillsSlice';

describe('Experience Slice', () => {
  it('should handle initial state', () => {
    expect(experienceReducer(undefined, { type: 'unknown' })).toEqual({
      list: []
    });
  });

  it('should handle setExperience', () => {
    const actual = experienceReducer({ list: [] }, setExperience(['item1']));
    expect(actual.list).toEqual(['item1']);
  });
});

describe('Profile Slice', () => {
  it('should handle initial state', () => {
    expect(profileReducer(undefined, { type: 'unknown' })).toEqual({
      data: null
    });
  });

  it('should handle setProfile', () => {
    const actual = profileReducer({ data: null }, setProfile({ id: 1 }));
    expect(actual.data).toEqual({ id: 1 });
  });
});

describe('Projects Slice', () => {
  it('should handle initial state', () => {
    expect(projectsReducer(undefined, { type: 'unknown' })).toEqual({
      list: [],
      featured: []
    });
  });

  it('should handle setProjects', () => {
    const actual = projectsReducer({ list: [] }, setProjects([{ id: 1 }]));
    expect(actual.list).toEqual([{ id: 1 }]);
  });

  it('should handle setFeaturedProjects', () => {
    const actual = projectsReducer(
      { featured: [] },
      setFeaturedProjects([{ id: 1 }])
    );
    expect(actual.featured).toEqual([{ id: 1 }]);
  });
});

describe('Skills Slice', () => {
  it('should handle initial state', () => {
    expect(skillsReducer(undefined, { type: 'unknown' })).toEqual({
      all: {},
      core: []
    });
  });

  it('should handle setSkills', () => {
    const actual = skillsReducer(
      { all: {} },
      setSkills({ frontend: ['React'] })
    );
    expect(actual.all).toEqual({ frontend: ['React'] });
  });

  it('should handle setCoreSkills', () => {
    const actual = skillsReducer({ core: [] }, setCoreSkills(['React']));
    expect(actual.core).toEqual(['React']);
  });
});
