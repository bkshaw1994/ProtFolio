import React from 'react';

const SkillBadge = ({ skill, showProficiency = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  // Default icon based on skill name if no icon provided
  const getDefaultIcon = (skillName) => {
    const name = skillName.toLowerCase();
    
    // You can extend this mapping or use actual icon URLs
    const iconMap = {
      'react': '⚛️',
      'javascript': '🟨',
      'typescript': '🔷',
      'nodejs': '🟢',
      'node.js': '🟢',
      'mongodb': '🍃',
      'express': '🚀',
      'css': '🎨',
      'html': '📄',
      'python': '🐍',
      'java': '☕',
      'git': '📂',
      'docker': '🐳',
      'aws': '☁️',
      'azure': '☁️',
      'mysql': '🗄️',
      'postgresql': '🐘',
      'redis': '🔴',
      'vue': '💚',
      'angular': '🔴',
      'php': '🐘',
      'laravel': '🎵',
      'django': '🐍',
      'flask': '🍶',
      'graphql': '💜',
      'rest': '🌐',
      'api': '🔌',
    };

    return iconMap[name] || '💻';
  };

  const proficiencyColor = (proficiency) => {
    if (proficiency >= 90) return 'text-success-600';
    if (proficiency >= 75) return 'text-primary-600';
    if (proficiency >= 60) return 'text-warning-600';
    return 'text-secondary-600';
  };

  return (
    <div className={`card ${sizeClasses[size]} text-center card-hover group transition-all duration-300`}>
      {/* Skill Icon */}
      <div className="flex justify-center mb-3">
        {skill.icon && skill.icon.startsWith('http') ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className={`w-${iconSizes[size]/4} h-${iconSizes[size]/4} object-contain group-hover:scale-110 transition-transform`}
          />
        ) : (
          <div className={`text-${iconSizes[size]/4}xl group-hover:scale-110 transition-transform`}>
            {skill.icon || getDefaultIcon(skill.name)}
          </div>
        )}
      </div>

      {/* Skill Name */}
      <h3 className={`font-semibold text-secondary-900 mb-2 ${textSizes[size]} group-hover:text-primary-600 transition-colors`}>
        {skill.name}
      </h3>

      {/* Proficiency Level */}
      {showProficiency && skill.proficiency && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary-600">Proficiency</span>
            <span className={`font-semibold ${proficiencyColor(skill.proficiency)}`}>
              {skill.proficiency}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                skill.proficiency >= 90
                  ? 'bg-success-500'
                  : skill.proficiency >= 75
                  ? 'bg-primary-500'
                  : skill.proficiency >= 60
                  ? 'bg-warning-500'
                  : 'bg-secondary-500'
              }`}
              style={{ width: `${skill.proficiency}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Years of Experience */}
      {skill.yearsOfExperience && (
        <div className="mt-2 text-xs text-secondary-600">
          {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} exp.
        </div>
      )}

      {/* Core Skill Badge */}
      {skill.isCore && (
        <div className="mt-2">
          <span className="badge badge-primary text-xs">
            Core Skill
          </span>
        </div>
      )}

      {/* Category */}
      <div className="mt-2 text-xs text-secondary-500 capitalize">
        {skill.category?.replace('-', ' ')}
      </div>
    </div>
  );
};

export default SkillBadge;
